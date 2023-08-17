import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { isLoading } from 'src/app/shared/ui.actions';
import { stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {

  itemList: IngresoEgreso[] = []
  itemListSubscription!: Subscription;
  orden: string = 'no orden'

  constructor(private store: Store<AppState>,
    private ieService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.itemListSubscription = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.itemList = items
      })
  }

  ngOnDestroy(): void {
    this.itemListSubscription.unsubscribe();
  }

  deleteItem(item) {
    this.store.dispatch(isLoading());
    Swal.fire({
      didOpen() {
        Swal.showLoading()
      }
    })
    this.ieService.deleteIngresoEgreso(item.docId)
      .then(() => {
        this.store.dispatch(stopLoading())
        Swal.fire({
          title: 'Elemento eliminado',
          icon: 'success'
        })
      })
      .catch(error => {
        this.store.dispatch(stopLoading())
        Swal.fire({
          title: 'Ups... algo salió mal',
          icon: 'error',
          text: error,
        });
      });
  }

  editarItem(item) {
    console.log(item);
  }
}
