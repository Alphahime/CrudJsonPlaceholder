import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { Comment } from './comment'; // Importez le modèle Comment

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts/')
      .pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/posts/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Nouvelle méthode pour obtenir les commentaires d'un post
  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiURL}/posts/${postId}/comments`)
      .pipe(catchError(this.errorHandler));
  }

  // Vous pouvez également ajouter des méthodes pour créer, mettre à jour ou supprimer des commentaires si nécessaire

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
