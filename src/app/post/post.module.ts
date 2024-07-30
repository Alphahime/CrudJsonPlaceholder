import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { PostService } from './post.service'; // Assurez-vous que le service est importé si nécessaire

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // Assurez-vous d'inclure ReactiveFormsModule ici
  ],
  providers: [PostService] // Ajoutez le service ici si nécessaire
})
export class PostModule { }
