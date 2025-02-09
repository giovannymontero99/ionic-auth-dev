import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UserService } from './core/auth/user.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'header',
    loadComponent: () => import('./core/layouts/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [
      ()=> inject(UserService).isAuthenticated.pipe(map( (isAuthenticated:boolean) => !isAuthenticated))
    ]
  },
];
