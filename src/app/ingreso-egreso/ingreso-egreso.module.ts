import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenAlfabeticoPipe } from '../pipes/orden-alfabetico.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ieReducer } from './store/ingreso-egreso.reducer';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    DashboardComponent,
    OrdenAlfabeticoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
    //Manjear por lazyload el store
    StoreModule.forFeature( 'ingresoEgreso', ieReducer )
  ]
})
export class IngresoEgresoModule { }
