import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map(user => !!user));

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public setAuth(value: User) {
    this.currentUserSubject.next(value);
  }

  getCurrentUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>("/user").pipe(
      tap({
        next: ({ user }) => {
          this.setAuth(user);
          return
        },
        error: (err) => this.purgeAuth(err), // 🔥 Call purgeAuth correctly
      }),
      shareReplay(1),
    );
  }

  purgeAuth(err: any) {
    this.currentUserSubject.next(null);
    console.log(err);
    // Redirect to the login page on unauthorized (401) error
    if (err.status === 401) {
      this.router.navigate(['/login']); // Redirect to login page
    }
  }
}
