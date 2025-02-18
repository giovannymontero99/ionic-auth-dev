import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UserService } from './core/auth/services/user.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'header',
    loadComponent: () => import('./core/layouts/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login.page').then( m => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
];
