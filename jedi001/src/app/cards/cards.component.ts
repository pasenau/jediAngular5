import { Component, OnInit } from '@angular/core'
import ApiCard from '../_models/api-card.model'
import { ApiService } from '../_shared/_services/api.service'
import ApiDeck from '../_models/api-deck.model'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
  myUserID = ''
  lstCards: ApiCard[]
  isLoading = false
  private _cardToDeleteID: string

  constructor(
    private _api: ApiService
  ) {
    this.lstCards = []
  }

  // i only can edit the cards i own.
  // as i don't have the user_id (neither the login process provides one)
  // i've to do it the hard way:
  // get my list of decks, and from there get the user_id

  ngOnInit() {
    this.doGetMyCards() // to automatically get the decks of cards and show them, i.e. no need to press the button
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

  onDelete( id: string, event: MouseEvent ) {
    console.log( 'OnDelete ' + id)
    event.stopPropagation()
  }

  onEdit( id: string, event: MouseEvent ) {
    console.log( 'OnDelete ' + id)
    event.stopPropagation()
  }

}
