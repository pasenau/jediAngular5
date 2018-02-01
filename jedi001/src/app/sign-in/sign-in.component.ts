import { Component, OnInit } from '@angular/core'
import User from '../_models/user.model'
import { ApiService } from '../_shared/_services/api.service'
import ApiUser from '../_models/api-user.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent  {

  user: User = new User()
  repeatedPassword = ''
  isLoading = false
  private readonly decksUrl = '/decks'

  constructor(
    private _router: Router,
    private _api: ApiService // injecto aqui el servei de comunicacio
  ) { }

  onSend() {
    // convert my User form to api-user
    const apiUser = new ApiUser
    apiUser.email = this.user.email
    apiUser.name = this.user.name
    apiUser.lastName = this.user.last_name
    apiUser.password = this.user.password
    // tambe podiem fer la conversio del objecte dins del servei
    this.isLoading = true
    this._api
      .signin( apiUser) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( response => {
        this.isLoading = false
        // el server m'ha respost
        console.log( response)
        // redireccionar a una altra pagina
        this._router.navigateByUrl( this.decksUrl)
      })           // funcion de la promise a executar quan hagi rebut del servidor
      .catch( error => {
        this.isLoading = false
        // quan la promise falla
        console.log( 'ERROR: ' + error)
        // missatge d'error a la form
        // bootstrap toast / bulma alert notifications, per mostrar errors en un shared component
      })
    console.log( 'New user is: ' + this.user.print())
  }

  arePasswordsEqual() {
    return this.user.password === this.repeatedPassword
  }
}
