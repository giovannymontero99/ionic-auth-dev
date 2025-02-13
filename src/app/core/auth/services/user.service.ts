import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map( user => !!user )) 

  constructor(
    private http : HttpClient
  ) { 
  }

  public setAuth(value: User){
    this.currentUserSubject.next(value);
  }

  getCurrentUser(): Observable<{ user: User }> {
    
    return this.http.get<{ user: User }>("user").pipe(
      tap({
        next: ({ user }) => {
          this.setAuth(user);
        },
        error: () => this.purgeAuth(),
      }),
      shareReplay(1),
    );
  }

  purgeAuth(){
    this.currentUserSubject.next(null);
  }

}
