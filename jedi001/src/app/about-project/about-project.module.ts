import { NgModule } from '@angular/core'
import { AboutProjectComponent } from './about-project.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../_shared/shared.module'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: AboutProjectComponent}
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    // CommonModule --> already in SharedModule
    SharedModule
  ],
  declarations: [
    AboutProjectComponent
  ]
})
export class AboutProjectModule { }
