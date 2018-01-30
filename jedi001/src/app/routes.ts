import { Routes } from '@angular/router'

export const routes: Routes = [
     // lazy loading, nomes baixem el modul que es fa servir
    { path: '', loadChildren: './about-project/about-project.module#AboutProjectModule'},
    { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule'}, // si fos comoponents, es baixarien totes les components
    { path: '**', redirectTo: '404', pathMatch: 'full'}
]
