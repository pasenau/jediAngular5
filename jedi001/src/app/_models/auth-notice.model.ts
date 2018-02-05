export class AuthNotice {

    constructor (
        public userName: string = '',
        public userId: number = -1,
        public type: AuthType = AuthType.LogOut   // enum podem fer-ho fora o, com es d'alert, ací
    ) {}
}

export enum AuthType {
    LogIn, // --> enable TopNavBar
    LogOut // --> disable TopNavBar
}
