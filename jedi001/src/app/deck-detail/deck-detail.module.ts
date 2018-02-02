import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DeckDetailComponent } from './deck-detail.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: 'create', component: DeckDetailComponent},
      { path: ':id', component: DeckDetailComponent} // ':' tells that it's a parameter
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    // FormsModule,
    // CommonModule --> already in SharedModule
    SharedModule
  ],
  declarations: [
    DeckDetailComponent
  ]
})
export class DeckDetailModule { }
