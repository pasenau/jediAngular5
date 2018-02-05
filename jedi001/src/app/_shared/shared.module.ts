import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppPopupComponent } from './components/app-popup/app-popup.component'
import { FormsModule } from '@angular/forms'
import { AppAlertComponent } from './components/app-alert/app-alert.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component'

// de momento solo los componentes

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppPopupComponent,
    AppAlertComponent,
    TopNavBarComponent
  ],
  exports: [   // que componentes queremos exportar de este modulo
    FormsModule,    // podemos meter aqui los modulos de angular que usemos
    CommonModule,   // para que los tengan todos los otros modulos
    AppPopupComponent,   // y evitar hacer import en cada uno de ellos
    AppAlertComponent,
    TopNavBarComponent
    // no fico aqui els services, pq son singletons
    // si varis components importen el SharedModule, tindran varies instancies...
    // per aixo l'exportem a app.module.ts
    // altra forma seria xxxService.forRoot(...) pero massa complicat.
  ]
})
export class SharedModule { }
