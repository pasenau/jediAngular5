import { Component, OnInit } from '@angular/core'

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

  onSend() {
    console.log( this.email, this.password)
  }
  onCheckPassword() {
    this.isPasswordCorrect = this.password.length >= this.minPasswordLength
  }
  onCheckPassword2() {
    this.isPasswordCorrect = this.password.length >= this.minPasswordLength
    return this.isPasswordCorrect // no caldria guardar-ho en una variable...
  }

}
