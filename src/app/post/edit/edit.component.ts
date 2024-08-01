import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  postId!: number;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      console.log('ID du post:', this.postId); // Vérifier l'ID du post
      this.loadPost();
    });

    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  loadPost() {
    this.postService.find(this.postId).subscribe(post => {
      console.log('Post chargé:', post); // Vérifier les données du post
      this.form.patchValue({
        title: post.title,
        body: post.body
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const updatedPost: Post = {
        id: this.postId,
        ...this.form.value
      };

      this.postService.update(this.postId, updatedPost).subscribe(() => {
        this.router.navigate(['/post/index']);
      });
    }
  }
}
