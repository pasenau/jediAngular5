import SocialLink from './social-link.model'

export default class AuthorInfo {
    constructor(
        public name: string = '',
        public last_name: string = '',
        public bio: string = '',
        public lst_social_links: SocialLink[] = []
    ) { }
    getFullName() {
        return '' + this.name + ' <b>' + this.last_name + '</b><small>' + ' ( ' + this.bio + ' )' + '</small>'
        // return this.name + ' ' + this.last_name + ' ( ' + this.bio + ' )'
    }
    insertHTML3() {
        return '<b>HOLA</b>'
    }
    insertHTML2() {
        return '<button>Hi button !!</button>'
    }
}
