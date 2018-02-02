import { Component, OnInit, ViewChild } from '@angular/core'
import { ApiService } from '../_shared/_services/api.service'
import ApiDeck from '../_models/api-deck.model'
import { AppPopupComponent } from '../_shared/components/app-popup/app-popup.component'

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.less']
})
export class DecksComponent implements OnInit {

  lstDecks: ApiDeck[]
  isLoading = false
  private _deckToDeleteID: string

  constructor(
    private _api: ApiService // injecto aqui el servei de comunicacio
  ) {
    this.lstDecks = []
  }

   // decorator to access the <app-popup>
   // decorator modifies next code-line
  @ViewChild('deletePopup') deletePopup: AppPopupComponent  // declaramos el componente que queremos acceder

  // el ViewChild ha de estar entre el constructor() i el ngOnInit()

  ngOnInit() {
    this.onSend() // to automatically get the decks of cards and show them, i.e. no need to press the button
  }

  onSend() {
    // convert my User form to a
    this.isLoading = true
    this._api
      .getDecks( ) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( response => {
        this.isLoading = false
        // el server m'ha respost
        console.log( response) // list of ApiDecks
        this.lstDecks = response
        // redireccionar a una altra pagina
      })           // funcion de la promise a executar quan hagi rebut del servidor
      // .catch( error => {
      //   this.isLoading = false
      //  })
      // no ens arribara el catch() pq ja el tenim capturat a la api.service
    console.log( 'Got list of decks')
  }
  onDelete( id: string, event: MouseEvent) { // tb puc accedir a les coordenades del mouse, etc...
    this._deckToDeleteID = id
    this.deletePopup.openPopup()
    event.stopPropagation() // no pasar l'event als elements grafics inferiors: li, ul, div, div, body

    // this.isLoading = true
    // this._api
    //   .deleteDeck( id) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
    //   // el server encara no m'ha contestat
    //   .then( deck => {
    //     this.isLoading = false
    //     // el server m'ha respost
    //     // refrescar la llista de decks
    //     // 2 opcions
    //     // - tornar a fer this.onSend()
    //     // - esborrar de lstDecks la que hem esborrat
    //     const idxDeck = this.lstDecks.findIndex( d => d.id === id)
    //     this.lstDecks.splice( idxDeck, 1)
    //     console.log( 'deleting ' + deck.title + ' ( ' + deck.id + ' )')
    //   })           // funcion de la promise a executar quan hagi rebut del servidor
  }

  onAcceptDelete( event) {
    this.isLoading = true
    this._api
      .deleteDeck( this._deckToDeleteID) // aixo es una promise, no puc asumir que hagi acabat de donarlo d'alta.
      // el server encara no m'ha contestat
      .then( deck => {
        this.isLoading = false
        // el server m'ha respost
        // refrescar la llista de decks
        // 2 opcions
        // - tornar a fer this.onSend()
        // - esborrar de lstDecks la que hem esborrat
        const idxDeck = this.lstDecks.findIndex( d => d.id === this._deckToDeleteID)
        this.lstDecks.splice( idxDeck, 1)
        console.log( 'deleting ' + deck.title + ' ( ' + deck.id + ' )')
      })           // funcion de la promise a executar qu
  }
}
