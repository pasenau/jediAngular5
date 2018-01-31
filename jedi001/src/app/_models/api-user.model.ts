export default class ApiUser {
    constructor(
        public name: string = '',
        public lastName: string = '',
        public email: string = '',
        public password: string = ''
    ) { }
    print() {
        console.log( 'name: ' + this.name)
        console.log( 'lastName: ' + this.lastName)
        console.log( 'email: ' + this.email)
        console.log( 'password: ' + this.password)
    }
}
