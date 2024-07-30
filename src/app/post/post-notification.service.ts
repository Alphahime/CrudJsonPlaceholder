// src/app/post/post-notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostNotificationService {
  private postCreatedSource = new Subject<void>();
  postCreated$ = this.postCreatedSource.asObservable();

  notifyPostCreated() {
    this.postCreatedSource.next();
  }
}
