import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { CreateUserInterface } from '../../interfaces/createUser.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    
  }
  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]]
    })
  }


  onSubmit() {

    if( this.form.invalid ){
      return;
    }

    Swal.fire({
      title: 'Cargando',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const correo = this.form.get('correo')?.value;
    const password = this.form.get('password')?.value;
    const nombre = this.form.get('nombre')?.value;

    this.authService.crearUsuario(correo, password, nombre).then( credentials => {
      Swal.close();
      this.router.navigateByUrl('/');
    }).catch( (error: FirebaseError) => {

      Swal.fire({
        icon :'error',
        title:'Oops...',
        text : error.code
      })

    });  

  }
}
