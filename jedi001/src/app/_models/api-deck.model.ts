export default class ApiDeck {
    id: string    // filled by server
    user_id: string    // filled by server

    constructor(
        public title: string = '',
        public description: string = '',
    ) { }
    print() {
        console.log( 'title: ' + this.title)
        console.log( 'description: ' + this.description)
    }
}
