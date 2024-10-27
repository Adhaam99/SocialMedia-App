import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { validator } from '../../utilites/validators';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  msg: string = '';

  signInApi!: Subscription;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, validator.email],
    password: [null, validator.password],
  });

  formSubmit = () => {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.signInApi = this._UsersService
        .signIn(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.message == 'success') {
              localStorage.setItem('userToken', res.token);
              this._Router.navigate(['/home']);
            }
            console.log(res);
          },
          error: (err) => {
            this.isLoading = false;
            this.msg = err.error.error;
          },
        });
    }
  };

  ngOnDestroy(): void {
    this.signInApi?.unsubscribe();
  }
}
