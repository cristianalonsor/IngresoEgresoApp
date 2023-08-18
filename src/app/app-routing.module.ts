import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' },
    //CARGANDO POR LAZYLOAD EL MODULO MÁS GRANDE DE LA APP
    {
        path: '',
        //Resolvemos la promesa de la ruta para traernos el modulo cuando ya esté cargando la app
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then(
            m => m.IngresoEgresoModule
        ),
        canLoad: [
            AuthGuard,
        ]
    },
]

@NgModule({
    imports: [
        //forRoot porque es el archivo de rutas principales
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }