import { Component, OnInit } from '@angular/core'
import User from '../_models/user.model'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  user: User = new User()
  repeatedPassword = ''

  constructor() { }

  ngOnInit() {
  }

  onSend() {
    console.log( 'New user is: ' + this.user.print())
  }

  arePasswordsEqual() {
    return this.user.password === this.repeatedPassword
  }
}
