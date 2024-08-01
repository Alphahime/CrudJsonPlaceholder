import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { PostNotificationService } from '../post-notification.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  addForm!: FormGroup;

  constructor(
    private postService: PostService,
    private notificationService: PostNotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadPosts();

    this.notificationService.postCreated$.subscribe(() => {
      this.loadPosts();
    });

    // Initialisation du formulaire d'ajout
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  loadPosts() {
    this.postService.getAll().subscribe((data: Post[]) => {
      console.log('Posts reçus:', data);
      this.posts = data;
    });
  }

  addPost() {
    if (this.addForm.valid) {
      const newPost: Post = this.addForm.value;
      console.log('Post à ajouter:', newPost);
      this.postService.create(newPost).subscribe((post: Post) => {
        this.posts.unshift(post); // Ajouter le nouveau post au début de la liste
        this.addForm.reset(); // Réinitialiser le formulaire
      });
    }
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(item => item.id !== id);
    });
  }
}
