import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUserInterface } from '../../interfaces/loginUser.Interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){

    if( this.form.invalid ){return;}
    const loginUser: LoginUserInterface = this.form.getRawValue();

    Swal.fire({
      title: 'Cargando',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    
    this.authService.login(loginUser).then( res => {
      Swal.hideLoading()
      Swal.close()
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
