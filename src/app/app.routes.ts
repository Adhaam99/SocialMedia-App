import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResgisterComponent } from './components/resgister/resgister.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { logedGuardGuard } from './core/guards/loged-guard.guard';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [logedGuardGuard],
    children: [
      
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: ResgisterComponent, title: 'Register' },

    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuardGuard],
    children: [
      
      { path: 'home', component: HomeComponent, title: 'Home' }, 
      { path: 'change-password', component: ChangePasswordComponent, title: 'Change Password' },

    ],
  },
];
