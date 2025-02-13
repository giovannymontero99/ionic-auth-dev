import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private userSerive : UserService,
    private storageService : StorageService
  ) { }

  login( credentials: { email: string, password: string } ): Observable<Object> {
    return this.http.post<{authorization: string}>('api/auth', { user: credentials })
      .pipe( 
        tap( (response) => this.setToken(response))
      )
  }

  setToken(response: any){
    const token = response.authorization ?? null;
    if( token !== null ){
      this.storageService.set('token',token);
      this.userSerive.setAuth(response.user as User);
    }
  }
}
