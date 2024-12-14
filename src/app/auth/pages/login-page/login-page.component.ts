import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router ); 


  public loginForm: FormGroup = this.fb.group({
    email: ['',[ Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  login(){
    const {email, password} = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (err) => { 
          const errorMenssage = Array.isArray(err) ? err.join(', ') : err
          Swal.fire('Error', errorMenssage, 'error')
        }
      })
  };


};
