import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-popup',
  templateUrl: './app-popup.component.html',
  styleUrls: ['./app-popup.component.less']
})

// class PopupButton {
//   name = 'button'
//   style = 'btn'
// }

// Popups especialitzats
// diferent components export class AppMyPopup extends AppPopupComponent...
export class AppPopupComponent {

  isOpen = false    // ha de ser publico pq lo usamos en el template y en decks.components
  // podemos hacerlo privado y usar getter y setter

  // @Input --> para que se pueda acceder desde decks.components.HTML
  @Input() popupTitle: string
  // si posem title directament, a decks...html 'title' es un atribut de tags i espot liar les coses, 
  // el mateix amb el selectors, per aixo sempre comencen per app-XXX o ngXXX
  @Input() buttonNames: string[] = [ 'Aceptar', 'Cancelar']
  @Input() buttonStyles: string[] = [ 'btn-ok', 'btn-cancel']
  // @Input() lstButtons: PopupButton[] = [ { 'name': 'Aceptar', 'style': 'btn-ok'}, { 'name': 'Cancelar', 'style': 'btn-cancelar'}, ]

  @Output() accept = new EventEmitter< any>()

  openPopup() { // no fem onOpenPopup pq tb volem accedir desde fora
    this.isOpen = true
  }
  closePopup() {
    console.log( 'close')
    this.isOpen = false
  }
  onAccept() {
    console.log( 'accept')
    // this.accept.emit( 'Hello')
    this.closePopup()
  }

  onKeyDown( ev: KeyboardEvent) {
    console.log( 'event =' + ev.key)
  }
}
