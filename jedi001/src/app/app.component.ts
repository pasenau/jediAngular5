import { Component, OnInit } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { AuthService } from './_shared/_services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'my app'
  // public pages, i.e. not needed to be logged in
  private readonly loginUrl = '/login'
  private readonly signinUrl = '/sign-in'
  private readonly notFoundUrl = '/404'
  // default page when logged in
  private readonly decksUrl = '/decks'

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this._router.events
    .subscribe( event => {
      // cada cop que hi hagi una redirecció es cridarà aquesta funcio
      // event saltara quan l'usuari comenci a canviar de ruta, quan acabi, ...
      if ( event instanceof NavigationStart) {
        // quan comenci a canviar
        const { url } = event // es el mateix que     const url = event.url
        // tenim 2 rutes publiques i N privades
        // podriem anar directament a mirar la cookie,
        // pero potser ho necesitem en un altre lloc --> servei
        const isLogged = this._auth.isLogged()
        if ( url !== this.notFoundUrl) { // show always the 404 page
          if ( url === this.loginUrl || url === this.signinUrl) {
            if ( isLogged) {
              this._router.navigateByUrl( this.decksUrl)
            }
          } else if ( !isLogged) {
            this._router.navigateByUrl( this.loginUrl)
          }
        }
      }
    })
  }
}
