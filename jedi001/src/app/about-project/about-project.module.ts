import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AboutProjectComponent } from './about-project.component'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: AboutProjectComponent}
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    CommonModule
  ],
  declarations: [
    AboutProjectComponent
  ]
})
export class AboutProjectModule { }
