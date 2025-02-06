import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { UserService } from '../core/auth/user.service';
import { reduce, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  isAuthenticated: boolean = false;


  ngOnInit(): void {

    this.userService.isAuthenticated
      .pipe(tap(isAuthenticated => {
        if(isAuthenticated){
          null
        }else{
          this.handlerAuthentication(isAuthenticated)
        }
      }))
      .subscribe( (isAuthenticated: boolean ) => this.isAuthenticated = isAuthenticated )
  }

  handlerAuthentication(isAuthenticated: boolean){
    console.log(isAuthenticated)
    if( !isAuthenticated ){
      this.router.navigate(['/login']);
    }
  }


}
