import { Component, OnInit } from '@angular/core'
import AboutProject from '../_models/about-project.model'
/* without {} because we've done an 'export default class ...' */
import AuthorInfo from '../_models/author-info.model'
import SocialLink from '../_models/social-link.model'
import { AuthService } from '../_shared/_services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.less']
})
export class AboutProjectComponent implements OnInit {
  loginUrl = '/login'

  title = 'my app'

  aboutProject: AboutProject = new AboutProject( 'Jedi card API',
      'initial Angular 5 demo app',
      'by Miguel Pasenau http://github.com/pasenau')
  aP: any = {
    title: 'Jedi car API',
    subtitle: 'by Miguel Pasenau'
  } /* con esto no nos autocompleta al hacer this.aP.(...) */
  authorId = 0

  lstAuthors: AuthorInfo[] = []

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  onButtonClick() {
      this.title = 'you clicked me !!!'
    }

  addAuthor() {
    const id = ++this.authorId
    this.lstAuthors.push( new AuthorInfo( 'My favorite',
    'author ' + id,
    'born in ' + ( 1900 + id * id),
  [ new SocialLink( 'facebook', 'fb://author_' + id), new SocialLink( 'twiter', 'tw://author_' + id)]))
  }

  isLogged() {
    return this._auth.isLogged()
  }

  onRedirectToLogin() {
    this._router.navigateByUrl( this.loginUrl)
  }

}
