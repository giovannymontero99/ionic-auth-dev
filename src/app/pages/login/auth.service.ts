import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  login( credentials: { email: string, password: string } ): Observable<Object> {
    return this.http.post('api/auth', { user: credentials })
  }



}
