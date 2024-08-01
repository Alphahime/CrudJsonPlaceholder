import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewComponent implements OnInit {
  post!: Post;
  comments: Comment[] = [
    { id: 1, postId: 1, author: 'Alpha', content: 'Commentaire!' },
    { id: 2, postId: 1, author: 'Alpha', content: 'Commentaire.' },
    { id: 3, postId: 1, author: 'Alpha', content: 'Commentaire.' }
  ]; // Données de commentaires statiques
  errorMessage: string | null = null;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('postId'));
      if (id) {
        this.postService.find(id).subscribe({
          next: (data: Post) => {
            this.post = data;
            // Pas besoin de charger les commentaires depuis un service
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de la récupération du post.';
          }
        });
      } else {
        this.errorMessage = 'ID du post manquant.';
      }
    });
  }
}
