import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { validator } from '../../utilites/validators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-resgister',
  standalone: true,
  imports: [RxReactiveFormsModule, ReactiveFormsModule, AlertComponent, NgClass],
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.scss',
})
export class ResgisterComponent implements OnDestroy {
  isLoading: boolean = false;
  msg:string = '';

  signUpApi!: Subscription;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);


  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, validator.name],
    email: [null, validator.email],
    password: [null, validator.password],
    rePassword: [null, validator.rePassword],
    dateOfBirth: [null, validator.dateOfBirth],
    gender: [null, validator.gender],
  });

  formSubmit = () => {
    console.log(this.registerForm);


    if (this.registerForm.valid) {
      this.isLoading = true;

      this.signUpApi = this._UsersService
        .signUp(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.message === 'success') {
              this.msg = res.message;
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 2000);
            }
            console.log(res);
          },
        });
    }
  };

  ngOnDestroy(): void {
    this.signUpApi?.unsubscribe();
  }
}
