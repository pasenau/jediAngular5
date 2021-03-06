import { Component, OnInit, ViewChild } from '@angular/core'
import ApiCard from '../_models/api-card.model'
import { ApiService } from '../_shared/_services/api.service'
import ApiDeck from '../_models/api-deck.model'
import { AppPopupComponent } from '../_shared/components/app-popup/app-popup.component'
import { AlertService } from '../_shared/_services/alert.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
  myUserID = ''
  lstCards: ApiCard[]
  isLoading = false
  // _cardToDelete was private but it needs to be accessed from html ...
  _cardToDelete: ApiCard
  myDeck: ApiDeck = new ApiDeck()

  constructor(
    private _api: ApiService,
    private _alert: AlertService,
    private _route: ActivatedRoute // para coger los parametros de la url
  ) {
    this.lstCards = []
  }

   // decorator to access the <app-popup>
   @ViewChild('deletePopup') deletePopup: AppPopupComponent  // declaramos el componente que queremos acceder
   // el ViewChild ha de estar entre el constructor() i el ngOnInit()

  // i only can edit the cards i own.
  // as i don't have the user_id (neither the login process provides one)
  // i've to do it the hard way:
  // get my list of decks, and from there get the user_id

  ngOnInit() {
    this._route.params.subscribe( p => { // cada cop que la ruta canvii em crida aquesta funcio
      // si no hi ha params, llavors p.id === null
      const { id } = p // const id = p.id
      console.log( 'inside subscription')
      console.log( p)
      if ( id) {
        this._api.getDeck( id)
          .then( deck => {
            // console.log( 'route of cards/deck')
            console.log( deck)
            this.myDeck = deck
            deck.cards.forEach( deck_card => {
              const card = deck_card
              card.editable = true
              this.lstCards.push( card)
            })
          })
      } else {
        // console.log( 'route/???')
        this.doGetMyCards() // get all cards
      }
    })

  }

  doGetMyCards() {
    // convert my User form to a
    this.isLoading = true
    this._api
      .getDecks( ) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( lstDecks => {
        // el server m'ha respost
        console.log( lstDecks)
        if ( lstDecks !== []) { // shouldn't be empty
          this.myUserID = lstDecks[ 0].user_id
          // now get the cards
          console.log( 'My user_id is = ' + this.myUserID)
          this.getMyCards( this.myUserID)
        }
      }
    )
  }

  getMyCards( userid: string) {
    // convert my User form to a
    this.isLoading = true
    this._api
      .getCards( ) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( lstCards => {
        this.isLoading = false
        // el server m'ha respost
        console.log( lstCards) // list of ApiCards
        lstCards.forEach( card => {
          if ( ( card.deck !== undefined) && ( card.deck.user_id === userid) ) {
            card.editable = true
          } else {
            card.editable = false
          }
          this.lstCards.push( card)
          // let user_id = 'Undefined deck'
          // if ( card.deck !== undefined) {
          //   user_id = card.deck.user_id
          // }
          // console.log( 'card ( ' + card.value + ', ' + card.suit + ') user id = ' + user_id)
        })
        // redireccionar a una altra pagina
      })
  }

  onDelete( c: ApiCard, event: MouseEvent) { // tb puc accedir a les coordenades del mouse, etc...
    this._cardToDelete = c
    this.deletePopup.openPopup()
    event.stopPropagation() // no pasar l'event als elements grafics inferiors: li, ul, div, div, body
  }

  onAcceptDeleteCard( event) {
    this.isLoading = true
    console.log( 'onAcceptDeleteCard')
    this._api
      .deleteCard( this._cardToDelete.id) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( card => {
        this.isLoading = false
        const idxCard = this.lstCards.findIndex( c => c.id === this._cardToDelete.id)
        this.lstCards.splice( idxCard, 1)
        this._alert.info( 'Deleted ' + card.suit + ' of ' + card.value + ' ( ' + card.id + ' )')
        console.log( 'deleting ' + card.suit + ' of ' + card.value + ' ( ' + card.id + ' )')
      })
      .catch( err => {
        console.log( 'Error deleting card: ' + err)
        console.log( err)
        this.isLoading = false
        this._alert.error( 'El mazo no se ha podido borrar\n' + err)
      })
  }

  // onEdit( id: string, event: MouseEvent ) {
  //   console.log( 'OnEdit ' + id)
  //   event.stopPropagation()
  // }

}
