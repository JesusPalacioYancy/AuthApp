import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );


  public registerFrom: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register(){
    const {name, email, password } = this.registerFrom.value;

    return this.authService.register(name, email, password)
      .subscribe({
        next: () => {
          Swal.fire('Saved', 'Usurio Reguistrado', 'success')
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
          const errorMensage = Array.isArray(err) ? err.join(', ') : err
          Swal.fire('Error', errorMensage, 'error')
        }
      });
  };

};
