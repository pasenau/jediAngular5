import ApiDeck from './api-deck.model'

export default class ApiCard {
    id: string         // filled by server
    deck_id: number    // filled by server
    deck: ApiDeck      // filled by server, contains user_id

    // my properties:
    editable: boolean  // all cards can be deleted but only mine can be edited

    constructor(
        public value: string = '',
        public suit: string = '',
        public image: string = ''
    ) { }
    print() {
        console.log( 'value: ' + this.value)
        console.log( 'suit: ' + this.suit)
        console.log( 'image: ' + this.image)
    }
}
