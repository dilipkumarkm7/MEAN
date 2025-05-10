import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
     { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
     { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
     { path: '**', redirectTo: 'login' }
];
