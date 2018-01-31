import { Component, OnInit } from '@angular/core'
import User from '../_models/user.model'
import { ApiService } from '../_shared/_services/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent  {

  user: User = new User()
  repeatedPassword = ''

  constructor(
    private _api: ApiService // injecto aqui el servei de comunicacio
  ) { }

  onSend() {
    this._api
      .signin( this.user) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( response => {
        // el server m'ha respost
        console.log( response)
        // redireccionar a una altra pagina
      })           // funcion de la promise a executar quan hagi rebut del servidor
      .catch( error => {
        // quan la promise falla
        console.log( 'ERROR: ' + error)
        // missatge d'error a la form
      })
    console.log( 'New user is: ' + this.user.print())
  }

  arePasswordsEqual() {
    return this.user.password === this.repeatedPassword
  }
}
