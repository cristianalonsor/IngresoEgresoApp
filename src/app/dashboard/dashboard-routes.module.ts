import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [
      // AuthGuard
    ]
  },
]

// MODULARIZAMOS LA APLICACIÓN HASTA PODER MANEJAR 
// LAS RUTAS DE LA APLICACIÓN DE UNA FORMA EXTERNA

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
