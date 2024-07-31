import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { PostService } from './post.service';

@NgModule({
  declarations: [
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule, // Assurez-vous que CommonModule est importé ici
    ReactiveFormsModule
  ],
  providers: [PostService]
})
export class PostModule { }
