import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardDetailComponent } from './card-detail.component'
import { SharedModule } from '../_shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule .forChild( [
      { path: 'create', component: CardDetailComponent},
      { path: ':id', component: CardDetailComponent} // ':' tells that it's a parameter
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    SharedModule // CommonModule in SharedModule
  ],
  declarations: [CardDetailComponent]
})
export class CardDetailModule { }
