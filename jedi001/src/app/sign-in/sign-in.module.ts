import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    RouterModule.forChild( [
      { path: '', component: SignInComponent}
    ]), // els modules tb tenen rutes, pero no som root, sino Childs
    FormsModule,
    CommonModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule { }
