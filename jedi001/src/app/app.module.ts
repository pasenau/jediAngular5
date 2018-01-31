import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { routes } from './routes'
import { LoginComponent } from './login/login.component'
import { SignInComponent } from './sign-in/sign-in.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot( routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
