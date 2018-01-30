
/*
export default class AboutProject {
    // default : we'll only export one class
    title: string
    subtitle: string
    description: string
    constructor( t: string, st: string, desc: string) {
        this.title = t
        this.subtitle = st
        this.description = desc
    }
}
*/
export default class AboutProject {
    // full_title: string
    constructor(
        public title: string = '', // parameters per defecte per poder cridar el constructor buit
        public subtitle: string = '',
        public description: string = ''
    ) { // si als parameters poso private / readonly, no podre cridar al constructor desde fora ...
        // this.full_title = this.title + ' ' + this.subtitle + ' ' + this.description
    }
}
