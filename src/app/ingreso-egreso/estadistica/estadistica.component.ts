import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

//CHART
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  totalIngresos: number = 0;
  totalEgresos : number = 0;
  ingresos: number = 0;
  egresos : number = 0;

  ieSubscription!: Subscription;


  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Ingresos'], ['Egresos']],
    datasets: [
      {
        data: [0,0],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';




  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log('oninit');
    this.ieSubscription = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => { this.generarEstadisticas(items) })

  }

  ngOnDestroy(): void {
    this.ieSubscription.unsubscribe();
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    
    items.forEach(item => {
      if( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });

    this.pieChartData.datasets = [
      {
        data: [ this.totalIngresos, this.totalEgresos ]
      }
    ]
  }

}
