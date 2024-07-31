import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  standalone: true,
  imports: [CommonModule] // Importation du CommonModule ici
})
export class ViewComponent implements OnInit {
  post!: Post;
  errorMessage: string | null = null;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('postId'));
      if (id) {
        this.postService.find(id).subscribe({
          next: (data: Post) => {
            this.post = data;
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
      } else {
        this.errorMessage = 'ID du post manquant.';
      }
    });
  }
}
