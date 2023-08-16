import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseError } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  storeSubscription!: Subscription;
  isLoading: boolean = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {

  }
  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.storeSubscription = this.store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }


  onSubmit() {

    if (this.form.invalid) { return }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Cargando',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    const correo = this.form.get('correo')?.value;
    const password = this.form.get('password')?.value;
    const nombre = this.form.get('nombre')?.value;

    this.authService.crearUsuario(correo, password, nombre).then(credentials => {
      this.store.dispatch(stopLoading());
      // Swal.close();
      this.router.navigateByUrl('/');
    }).catch((error: FirebaseError) => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.code
      })

    });

  }
}
