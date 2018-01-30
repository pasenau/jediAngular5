export default class SocialLink {
    constructor(
        public name: string = '',
        public url: string = ''
    ) { }
    printAnchor() {
        return '<a href="' + this.url + '">' + this.name + '</a>'
    }
}
