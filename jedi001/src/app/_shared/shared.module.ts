import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppPopupComponent } from './components/app-popup/app-popup.component'
import { FormsModule } from '@angular/forms'

// de momento solo los componentes

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppPopupComponent
  ],
  exports: [   // que componentes queremos exportar de este modulo
    FormsModule,    // podemos meter aqui los modulos de angular que usemos
    CommonModule,   // para que los tengan todos los otros modulos
    AppPopupComponent   // y evitar hacer import en cada uno de ellos
  ]
})
export class SharedModule { }
