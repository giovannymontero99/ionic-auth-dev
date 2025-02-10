import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { UserService } from './user.service';

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
      .pipe( tap( ({authorization}) => this.setToken(authorization) ) )
  }


  async setToken(authorization: string){
    const token = authorization.split(' ')[1] ?? null;

    if( token !== null ){
      await this.storageService.set('token',token);
      this.userSerive.setUser(true);
    }
    
  }



}
