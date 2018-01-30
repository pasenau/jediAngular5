import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotFoundComponent } from './not-found.component'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: NotFoundComponent} // el root del ..../404/
      // podria fer d'aquest modul el tractament d'errors i per cada error un component, p.ex.
      // localhost/error/404 ---> not-found-component
      // localhost/error/5xx --> component de internal server error
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    CommonModule
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
