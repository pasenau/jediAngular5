export default class ApiCard {
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
