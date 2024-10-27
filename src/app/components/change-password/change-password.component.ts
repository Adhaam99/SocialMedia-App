import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { validator } from '../../utilites/validators';
import { NgClass } from '@angular/common';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, AlertComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements AfterViewChecked {
  isLoading: boolean = false;
  msg: string = '';
  confirmPassword = '';
  signInApi!: Subscription;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ChangeDetectorRef = inject(ChangeDetectorRef);

  changePass: FormGroup = this._FormBuilder.group({
    password: [null, validator.password],
    newPassword: [null, validator.password],
    confirmPassword: [null, validator.confirmPassword],
  });

  formSubmit = () => {
    const form: object = {
      password: this.changePass.get('password')?.value,
      newPassword: this.changePass.get('newPassword')?.value,
    };
    console.log(this.changePass);
    console.log(form);

    this._UsersService.changePassword(form).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this.msg = res.message;
        
      },
    });
  };

  ngAfterViewChecked(): void {
    this._ChangeDetectorRef.detectChanges();
  }
}
