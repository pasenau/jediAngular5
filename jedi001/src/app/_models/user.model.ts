export default class User {
    user_id: number
    constructor(
        public name: string = '',
        public last_name: string = '',
        public email: string = '',
        public password: string = ''
    ) { }
    print() {
        console.log( 'name: ' + this.name)
        console.log( 'last_name: ' + this.last_name)
        console.log( 'email: ' + this.email)
        console.log( 'password: ' + this.password)
    }
}
