import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: LoginComponent}
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    FormsModule,
    CommonModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
