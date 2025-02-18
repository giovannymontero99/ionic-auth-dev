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
    return this.http.post<{authorization: string}>('/auth', { user: credentials })
      .pipe( 
        tap( (response) => this.asingValues(response))
      )
  }

  asingValues(response: any){
    console.log('respuesta de servidor', response);
    //this.userSerive.setAuth(response.user as User);
  }
}
