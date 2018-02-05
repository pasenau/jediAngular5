import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import ApiUser from '../../_models/api-user.model'
import ApiDeck from '../../_models/api-deck.model'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import ApiCard from '../../_models/api-card.model'

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
      .catch( e => this.handleError( e))
  }
  getDeck( id: string): Promise< any> {
    // return this._http.post( this.apiUrl + 'decks', {}).toPromise()
    return this._http.get( this.apiUrl + 'decks/' + id)
      .toPromise()
      .catch( e => this.handleError( e))
  }
  deleteDeck( deckId: string): Promise< any> {
    return this._http.delete( this.apiUrl + 'decks/' + deckId)
    .toPromise()
    .catch( e => this.handleError( e))
    // opcio2
    // return this.delete( this.apiUrl + 'decks/' + deckId)
    // opcio3
    // return this.fetch( 'delete', this.apiUrl + 'decks/' + deckId)
  }

  postDeck( deck: ApiDeck) {
    return this._http.post( this.apiUrl + 'decks', deck)
    .toPromise()
    .catch( e => this.handleError( e))
  }
  putDeck( deck: ApiDeck) {
    return this._http.put( this.apiUrl + 'decks/' + deck.id, deck)
    .toPromise()
    .catch( e => this.handleError( e))
  }

  private handleError( err) {
    if ( err.status === 401) { // e.status es un enter
      this._auth.logout()
      this._router.navigateByUrl( this.loginUrl)
    }
    throw err // per propagar el catch() a qui m'ha cridat, si no, el para executarà el then() !!!
  }

  // opcio2
  private delete( url) {
    return this._http.delete(url)
    .toPromise()
    .catch( e => this.handleError( e))
  }

  // opcio3
  private fetch( verb, url, data = {}) {
    return this._http[ verb]( url, data)
    .toPromise()
    .catch( e => this.handleError( e))
  }

  // Cards api:
  getCards( ): Promise< any> {
    return this._http.get( this.apiUrl + 'cards')
      .toPromise()
      .catch( e => this.handleError( e))
  }
  getCard( id: string): Promise< any> {
    return this._http.get( this.apiUrl + 'cards/' + id)
      .toPromise()
      .catch( e => this.handleError( e))
  }
  deleteCard( cardId: string): Promise< any> {
    return this._http.delete( this.apiUrl + 'cards/' + cardId)
    .toPromise()
    .catch( e => this.handleError( e))
  }
  postCard( card: ApiCard) {
    return this._http.post( this.apiUrl + 'cards', card)
    .toPromise()
    .catch( e => this.handleError( e))
  }
  putCard( card: ApiCard) {
    return this._http.put( this.apiUrl + 'cards/' + card.id, card)
    .toPromise()
    .catch( e => this.handleError( e))
  }

}
