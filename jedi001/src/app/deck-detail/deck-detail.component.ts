import { Component, OnInit } from '@angular/core'
import { ApiService } from '../_shared/_services/api.service'
import { Router, ActivatedRoute } from '@angular/router'
import ApiDeck from '../_models/api-deck.model'

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.less']
})
export class DeckDetailComponent implements OnInit {
  private readonly decksUrl = '/decks'
  myDeck: ApiDeck = new ApiDeck()

  constructor(
    private _router: Router,
    private _route: ActivatedRoute, // para coger los parametros de la url
    private _api: ApiService // injecto aqui el servei de comunicacio
  ) { }

  ngOnInit() {
    this._route.params.subscribe( p => { // cada cop que la ruta canvii em crida aquesta funcio
      // si no hi ha params, llavors p.id === null
      const { id } = p // const id = p.id
      if ( id) {
        this._api.getDeck( id)
          .then( deck => this.myDeck = deck)
      }
    })
  }

  isFormSendable( formValid: boolean) {
    return formValid && this.myDeck.title.length && this.myDeck.description.length
  }

  onSend() {
    // console.log( this.email, this.password)
    // this.myDeck.id sera null si es nova --> postDeck
    // si no --> putDeck
    // o _api.updateOrCreate(...) i alla dintre checkjar myDeck.id (ojo que tb la url canvia)
    this._api[ this.myDeck.id ? 'putDeck' : 'postDeck']( this.myDeck)
      .then( response => {
        console.log( response)
        // redireccionar a una altra pagina
        this._router.navigateByUrl( this.decksUrl)
      })
  }
}
