import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as actions from './../shared/ui.actions'
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{

  form!: FormGroup;
  tipo: string = 'ingreso';
  isLoading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(private fb: FormBuilder,
    private ieService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
    });
    this.loadingSubscription = this.store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit() {

    if (this.form.invalid) { return; }
    
    this.store.dispatch(actions.isLoading());
    
    //Desestructuramos el objeto que viene del form
    const { description, monto } = this.form.value;
    //nueva instancia de IngresoEgreso
    const ie = new IngresoEgreso(description, monto, this.tipo);
    
    //Realizamos la inserción de la data a FirebaseStorage
    this.ieService.createIngresoEgreso(ie).then(
      () => {
        this.store.dispatch(actions.stopLoading());

        Swal.fire({
          title: 'Registro Creado con Éxito',
          icon: 'success',
          text: description,
        });
      }
    ).catch(error => {
      this.store.dispatch(actions.stopLoading());

      Swal.fire({
        title: 'Ups... algo salió mal',
        icon: 'error',
        text: error,
      });
    });

    //Limpiamos el formulario
    this.form.reset();
  }
}