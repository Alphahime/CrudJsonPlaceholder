import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importation du RouterModule
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component'; // Assure-toi que le composant Edit est importé

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent // Déclare également le composant Edit si nécessaire
  ],
  imports: [
    CommonModule,
    RouterModule // Ajoute RouterModule aux imports
  ]
})
export class PostModule { }
