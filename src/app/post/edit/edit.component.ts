import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] // Ajout de CommonModule ici
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
    // Récupération de l'ID du post depuis les paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('postId'));
      this.loadPost();
    });

    // Initialisation du formulaire
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  // Chargement des données du post
  loadPost() {
    this.postService.find(this.postId).subscribe(post => {
      this.form.patchValue({
        title: post.title,
        body: post.body
      });
    });
  }

  // Méthode pour soumettre le formulaire
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
