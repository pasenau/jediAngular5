import { Component, OnInit } from '@angular/core'
import { ApiService } from '../_shared/_services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  // private readonly minPasswordLength = 6  // readonly = const, private = només aquí
  // private attributes can not be accesed from template & others. Only inside this class
  // eventually in debug mode, they can be accesed from template but in production no!

  readonly minPasswordLength = 6  // readonly = const, private = només aquí

  email = ''
  password = ''
  isPasswordCorrect = false
  isLoading = false

  constructor(
    private _api: ApiService // injecto aqui el servei de comunicacio
  ) { }

  onSend() {
    // console.log( this.email, this.password)
    this.isLoading = true
    this._api
      .login( this.email, this.password) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( response => {
        this.isLoading = false
        // el server m'ha respost
        console.log( response)
        // redireccionar a una altra pagina
      })           // funcion de la promise a executar quan hagi rebut del servidor
      .catch( error => {
        this.isLoading = false
        // quan la promise falla
        console.log( 'ERROR: ' + error)
        // missatge d'error a la form
        // bootstrap toast / bulma alert notifications, per mostrar errors en un shared component
      })
    console.log( 'User logged in?: ' + this.email)
  }
  onCheckPassword() {
    this.isPasswordCorrect = this.password.length >= this.minPasswordLength
  }
  onCheckPassword2() {
    this.isPasswordCorrect = this.password.length >= this.minPasswordLength
    return this.isPasswordCorrect // no caldria guardar-ho en una variable...
  }

  onCheckPassword3( txt) {
    this.password = txt
    this.isPasswordCorrect = this.password.length >= this.minPasswordLength
  }
}
