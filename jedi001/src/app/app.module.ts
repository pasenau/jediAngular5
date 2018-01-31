import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { routes } from './routes'
import { LoginComponent } from './login/login.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { ApiService } from './_shared/_services/api.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot( routes),
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
