import { Injectable } from '@angular/core'
import { CookieService } from 'ng2-cookies'
import User from '../../_models/user.model'
import { AuthNotice, AuthType } from '../../_models/auth-notice.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthService {
  private readonly cookieToken = 'api-token'
  userName = ''
  userID = -1

  constructor(
    private _cookies: CookieService
  ) { }

  private _alertSubject: Subject< AuthNotice> = new Subject< AuthNotice>()  // el tema que volem observar
  alert: Observable< AuthNotice> = this._alertSubject.asObservable()    // la subscripció al tema

  isLogged() {
    // nomes cal checkejar si existeix
    return this._cookies.check( this.cookieToken)
  }

  setLoggedUserInfo( name: string, id: number) {
    const newEvent = new AuthNotice( name, id, AuthType.LogIn)
    this.userName = name
    this.userID = id
    this._alertSubject.next( newEvent)
  }

  getUserInfo(): AuthNotice {
    return new AuthNotice( this.userName, this.userID, this.isLogged() ? AuthType.LogIn : AuthType.LogOut)
  }

  logout() {
    // this._cookies.delete( this.cookieToken)
    // hauriem d'esborrar totes les cookies de l'usuari
    this._cookies.deleteAll()
    const newEvent = new AuthNotice( '', -1, AuthType.LogOut)
    this._alertSubject.next( newEvent)
  }
}
