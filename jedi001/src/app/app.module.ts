import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ng2-cookies'

import { AppComponent } from './app.component'
import { routes } from './routes'
import { LoginComponent } from './login/login.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { ApiService } from './_shared/_services/api.service'
import { AuthService } from './_shared/_services/auth.service'
import { SharedModule } from './_shared/shared.module';
import { AlertService } from './_shared/_services/alert.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot( routes),
    HttpClientModule,
    BrowserModule,
    SharedModule      // en cada modulo que se necesite o aqui para que ya todos los tengan
      // con esto podemos aprovechar y meter todos los modulos de Angular que
      // necesitemos tambien en Shared, de esta manera sólo
      // hace falta importar Shared en app y ya los tenemos
  ],
  providers: [
    ApiService,
    AuthService,
    CookieService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
