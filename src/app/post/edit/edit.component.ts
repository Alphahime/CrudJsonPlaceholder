import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  post!: Post;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('postId'));
      this.postService.find(id).subscribe((data: Post) => {
        this.post = data;
        this.form = new FormGroup({
          title: new FormControl(this.post.title, Validators.required),
          body: new FormControl(this.post.body, Validators.required)
        });
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const id = this.post.id;
    this.postService.update(id, this.form.value).subscribe((res: any) => {
      console.log('Post mis à jour avec succès !');
      this.router.navigateByUrl('post/index');
    });
  }
}
