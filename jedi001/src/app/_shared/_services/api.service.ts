import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import ApiUser from '../../_models/api-user.model'
import ApiDeck from '../../_models/api-deck.model'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable()       // patro de diseny: DependencyInjection
export class ApiService {

  // aquesta es una variable a ficar a environment/...
  // per tenir 2 versions: environment.prod.ts i environment.ts /(debug)
  // private readonly apiUrl = 'https://jedi-card-api.herokuapp.com/api/'
  private readonly apiUrl = '/api/'
  private readonly loginUrl = '/login'

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _auth: AuthService
  ) {}

  signin( user: ApiUser): Promise< any> { // any fins que no tinguen la cosa mes definida
    // _http.post() retorna observable. que no está estes, nomes ho fa servir angular
    // si fiquem directament la url es donara error CORS
    // estem fent servir localhost com a server i canviem a un extern --> error de seguretat
    return this._http.post( this.apiUrl + 'auth/signin', user).toPromise()
    // per evitar CORS configurarem un proxy
    // localhost:4200/api --> jedi...../api
  }

  login( email: string, password: string): Promise< any> { // any fins que no tinguen la cosa mes definida
    // _http.post() retorna observable. que no está estes, nomes ho fa servir angular
    // si fiquem directament la url es donara error CORS
    // estem fent servir localhost com a server i canviem a un extern --> error de seguretat
    // { email, password} == { email: email, password: password}
    return this._http.post(
      this.apiUrl + 'auth/login',
      { email, password}).toPromise()
    // per evitar CORS configurarem un proxy
    // localhost:4200/api --> jedi...../api
  }

  getDecks( ): Promise< any> {
    // return this._http.post( this.apiUrl + 'decks', {}).toPromise()
    return this._http.get( this.apiUrl + 'decks')
      .toPromise()
      .catch( e => { // interesa que aquest catch estigui a totes les crides que fem al servidor
        if ( e.status === 401) { // e.status es un enter
          this._auth.logout()
          this._router.navigateByUrl( this.loginUrl)
        }
      })
  }
  deleteDeck( deckId: string): Promise< any> {
    return this._http.delete( this.apiUrl + 'decks/' + deckId)
    .toPromise()
    .catch( e => { // interesa que aquest catch estigui a totes les crides que fem al servidor
      if ( e.status === 401) { // e.status es un enter
        this._auth.logout()
        this._router.navigateByUrl( this.loginUrl)
      }
    })
  }
}
