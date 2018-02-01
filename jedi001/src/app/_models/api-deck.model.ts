export default class ApiDeck {
    constructor(
        public title: string = '',
        public description: string = '',
        public id: string = '',
        public user_id: string = ''
    ) { }
    print() {
        console.log( 'title: ' + this.title)
        console.log( 'description: ' + this.description)
    }
}
