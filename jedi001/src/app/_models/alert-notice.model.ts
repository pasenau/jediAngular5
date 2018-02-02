export class AlertNotice {

    constructor (
        public title: string = '',
        public message: string = '',
        public type: AlertType = AlertType.Info   // enum podem fer-ho fora o, com es d'alert, ací
    ) {}
}

export enum AlertType {
    Info, // per defecte sembla que es un int, pero podem fer Info = 'Info', i.e. que siguin strings
    Error
}
