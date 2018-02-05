import { Component, OnInit } from '@angular/core'
import ApiCard from '../_models/api-card.model'
import { Router, ActivatedRoute } from '@angular/router'
import { ApiService } from '../_shared/_services/api.service'
import { AlertService } from '../_shared/_services/alert.service'
import ApiDeck from '../_models/api-deck.model'

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.less']
})
export class CardDetailComponent implements OnInit {
  private readonly cardsUrl = '/cards'
  lstDecks: ApiDeck[]
  isLoading = 0
  myCard: ApiCard = new ApiCard()

  constructor(
    private _router: Router,
    private _route: ActivatedRoute, // para coger los parametros de la url
    private _api: ApiService, // injecto aqui el servei de comunicacio
    private _alert: AlertService
  ) {
    this.lstDecks = []
  }

  ngOnInit() {
    this.isLoading++
    this._route.params.subscribe( p => { // para coger de la url (.../card/ID) el id de la carta
      // si no hi ha params, llavors p.id === null
      const { id } = p // const id = p.id
      if ( id) {
        this._api.getCard( id)
          .then( card => {
            this.myCard = card
            this.checkIfItsEditable()
            this.isLoading--
          })
      } else {
        this.myCard.editable = true      // we're creating a new card
        this.isLoading--
      }
    })
    // list of decks needed to fill the form
    this.getListOfDecks()
  }

  checkIfItsEditable() {
    let myUserID = ''
    this.isLoading++
    this._api
      .getDecks( ) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( lstDecks => {
        // el server m'ha respost
        console.log( lstDecks)
        if ( lstDecks !== []) { // shouldn't be empty
          myUserID = lstDecks[ 0].user_id
          // now get the cards
          console.log( 'My user_id is = ' + myUserID)
          if ( ( this.myCard.deck !== undefined) && ( this.myCard.deck.user_id === myUserID) ) {
            this.myCard.editable = true
          } else {
            this.myCard.editable = false
          }
        }
        this.isLoading--
      }
    )
  }

  getListOfDecks() {
    // convert my User form to a
    this.isLoading++
    this._api
      .getDecks( )
      .then( response => {
        this.isLoading--
        // el server m'ha respost
        this.lstDecks = response
      }
    )
  }

  isFormSendable( formValid: boolean) {
    return formValid && this.myCard.suit.length && this.myCard.value.length
  }

  onSend() {
    console.log( this.myCard)
    // card.deck_id is a number and not a string
    // the form's combobox puts a string, we need to transform it to a number
    this.myCard.deck_id = Number( this.myCard.deck_id)
    console.log( this.myCard)
    this._api[ this.myCard.id ? 'putCard' : 'postCard']( this.myCard)
      .then( response => {
        console.log( response)
        // redireccionar a una altra pagina
        this._router.navigateByUrl( this.cardsUrl)
        // alertem aquí que es quan el server ha respost
        const txt = this.myCard.id ? ' Carta editada' : 'Nueva carta creada.'
        this._alert.info( '¡ Felicidades ! ' + txt)
      }).catch( err => {
        this._alert.error( 'Error creando la carta: ya existe')
      })
  }
}
