import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardsComponent } from './cards.component'
import { SharedModule } from '../_shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: CardsComponent}
    ]),
    // CommonModule, already in SharedModule
    SharedModule
  ],
  declarations: [CardsComponent]
})
export class CardsModule { }
