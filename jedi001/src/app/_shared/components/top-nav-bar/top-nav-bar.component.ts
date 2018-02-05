import { Component, OnInit, ViewChild } from '@angular/core'
import User from '../../../_models/user.model'
import { AuthService } from '../../_services/auth.service'
import { AuthNotice, AuthType } from '../../../_models/auth-notice.model'
import { Router } from '@angular/router'
import { AppPopupComponent } from '../app-popup/app-popup.component';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.less']
})
export class TopNavBarComponent implements OnInit {
  private readonly loginUrl = '/login'
  private readonly decksUrl = '/decks'
  private readonly cardsUrl = '/cards'
  authAlert: AuthNotice = new AuthNotice() // sempre inicialitzar pq es cride isInfo() en carregar la aplicacio
  isShown = false
  userName = ''

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

   // decorator to access the <app-popup>
   // decorator modifies next code-line
   @ViewChild('logoutPopup') logoutPopup: AppPopupComponent  // declaramos el componente que queremos acceder

  ngOnInit() {
    // s'ha de suscriure a AlertService pq l'avisi
    this._auth.alert.subscribe( a => {
      this.authAlert = a
      console.log( a)
      if ( a.type === AuthType.LogOut) {
        // redirects to login page
        console.log( 'shutting down top nav bar')
        this.isShown = false
        this._router.navigateByUrl( this.loginUrl)
      } else {
        console.log( 'shutting up top nav bar')
        this.isShown = true
        this.userName = a.userName
      }
    })

    // check for state, may be there has been a reload event
    const lastState = this._auth.getUserInfo()
    this.isShown = lastState.type === AuthType.LogIn
    this.userName = lastState.userName
  }

  onLogout( ev: MouseEvent) {
    ev.stopPropagation()
    this.logoutPopup.openPopup()
  }
  onAcceptLogout( ev: MouseEvent) {
    // send logout event to AuthService
    this._auth.logout() // this will trigger logout event handled on ngOnInit()
  }

  onRedirectToDecks() {
    this._router.navigateByUrl( this.decksUrl)
  }
  onRedirectToCards() {
    this._router.navigateByUrl( this.cardsUrl)
  }
}
