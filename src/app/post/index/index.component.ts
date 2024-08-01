import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { PostNotificationService } from '../post-notification.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importer FormsModule ici

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule // Ajouter FormsModule ici
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  addForm!: FormGroup;
  searchQuery: string = '';

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

    // Initialisation du filtre
    this.applyFilter();
  }

  loadPosts() {
    this.postService.getAll().subscribe((data: Post[]) => {
      console.log('Posts reçus:', data);
      this.posts = data;
      this.applyFilter(); // Appliquer le filtre lorsque les posts sont chargés
    });
  }

  addPost() {
    if (this.addForm.valid) {
      const newPost: Post = this.addForm.value;
      console.log('Post à ajouter:', newPost);
      this.postService.create(newPost).subscribe((post: Post) => {
        this.posts.unshift(post); // Ajouter le nouveau post au début de la liste
        this.addForm.reset(); // Réinitialiser le formulaire
        this.applyFilter(); // Appliquer le filtre après l'ajout
      });
    }
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(item => item.id !== id);
      this.applyFilter(); // Appliquer le filtre après la suppression
    });
  }

  // Méthode pour appliquer le filtre de recherche
  applyFilter() {
    if (this.searchQuery) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPosts = [...this.posts];
    }
  }
}
