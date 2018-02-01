import { Injectable } from '@angular/core'
import { CookieService } from 'ng2-cookies'

@Injectable()
export class AuthService {
  private readonly cookieToken = 'api-token'

  constructor(
    private _cookies: CookieService
  ) { }

  isLogged() {
    // nomes cal checkejar si existeix
    return this._cookies.check( this.cookieToken)
  }

  logout() {
    // this._cookies.delete( this.cookieToken)
    // hauriem d'esborrar totes les cookies de l'usuari
    this._cookies.deleteAll()
  }
}
