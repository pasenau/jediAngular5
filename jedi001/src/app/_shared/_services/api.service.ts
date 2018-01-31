import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import User from '../../_models/user.model'

@Injectable()       // patro de diseny: DependencyInjection
export class ApiService {

  // aquesta es una variable a ficar a environment/...
  // per tenir 2 versions: environment.prod.ts i environment.ts /(debug)
  // private readonly apiUrl = 'https://jedi-card-api.herokuapp.com/api/'
  private readonly apiUrl = '/api/'

  constructor(
    private _http: HttpClient
  ) {}

  signin( user: User): Promise< any> { // any fins que no tinguen la cosa mes definida
    // _http.post() retorna observable. que no está estes, nomes ho fa servir angular
    // si fiquem directament la url es donara error CORS
    // estem fent servir localhost com a server i canviem a un extern --> error de seguretat
    return this._http.post( this.apiUrl + 'auth/signin', user).toPromise()
    // per evitar CORS configurarem un proxy
    // localhost:4200/api --> jedi...../api
  }
}
