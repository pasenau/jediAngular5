import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { AlertNotice, AlertType} from '../../_models/alert-notice.model';

@Injectable()
export class AlertService {

  // Subject que volem observar = enregistrar-nos i que ens avisi quan canvii
  private _alertSubject: Subject< AlertNotice> = new Subject< AlertNotice>()  // el tema que volem observar
  alert: Observable< AlertNotice> = this._alertSubject.asObservable()    // la subscripció al tema
  // molta gent segueix el conveni que els noms d'observables acaben en '$': alert$
  // pero en angular no ho recomanen ( no diuen res)

  error( message: string , title = 'Error: ') {
    const newAlert = new AlertNotice( title, message, AlertType.Error)
    // mostrar error
    this._alertSubject.next( newAlert) // el seguent Subject es aquesta nova alerta
  }

  info( message: string, title = 'Atención: ') {
    // mostrar missatge de info
    const newInfo = new AlertNotice( title, message, AlertType.Info)
    this._alertSubject.next( newInfo) // el seguent Subject es aquesta nova alerta
  }

}
