import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { AlertNotice, AlertType } from '../../../_models/alert-notice.model';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.less']
})
export class AppAlertComponent implements OnInit {
  private readonly msToDisappear = 2000 // in ms

  constructor(
    private _alert: AlertService
  ) { }

  alert: AlertNotice = new AlertNotice() // sempre inicialitzar pq es cride isInfo() en carregar la aplicacio
  // pq a app.component.html
  isShown = false

  ngOnInit() {
    // s'ha de suscriure a AlertService pq l'avisi
    this._alert.alert.subscribe( a => {
      this.alert = a
      this.isShown = true
      setTimeout( () => this.isShown = false, this.msToDisappear)
      // setInterval( () => {}, this.msToDisappear) // cada X ms s'executa la funcio
    })
  }

  isInfo() {
    return this.alert.type === AlertType.Info
  }

  isError() {
    return this.alert.type === AlertType.Error
  }
}
