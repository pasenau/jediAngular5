import { Routes } from '@angular/router'

export const routes: Routes = [
     // lazy loading, nomes baixem el modul que es fa servir
    { path: '', loadChildren: './about-project/about-project.module#AboutProjectModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule'},
    { path: 'decks', loadChildren: './decks/decks.module#DecksModule'},
    { path: 'deck', loadChildren: './deck-detail/deck-detail.module#DeckDetailModule'},
    { path: 'cards', loadChildren: './cards/cards.module#CardsModule'},
    { path: 'card', loadChildren: './card-detail/card-detail.module#CardDetailModule'},
    { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'}, // si fos comoponents, es baixarien totes les components
    { path: '**', redirectTo: '404', pathMatch: 'full'}
]
