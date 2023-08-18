import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as actions from './../ingreso-egreso/store/ingreso-egreso.actions';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  itemsSubscription!: Subscription;

  constructor(private ieService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    //Listener de los eventos en el store y firebase
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(
        ({ user }) => {
          //iniciamos a escuchar los cambios de items
          this.itemsSubscription = this.ieService
            .initIngresosEgresosItemsListener(user?.uid)
            .subscribe(ieData => {

              //hacemos el dispatch de la action para setear los items en el store
              this.store.dispatch(actions.setItems({ items: ieData }));
            })
        }
      )
  }

  ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }


}
