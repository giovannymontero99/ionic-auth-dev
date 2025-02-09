import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonList, IonInput, IonCardContent, IonCard, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { AuthForm } from './interfaces/authForm';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardTitle, IonCard, IonCardContent, IonInput, IonList, IonItem, IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  authForm: FormGroup<AuthForm>;

  constructor(
    private authService : AuthService
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('',{
        validators: [Validators.required],
        nonNullable: true
      }),
      password: new FormControl('', {
        validators: [ Validators.required ],
        nonNullable: true
      })
    });
  }
  ngOnInit() {
  }

  submitForm(){
    this.authService.login( this.authForm.value as {email:string,password: string} )
      .subscribe({
        next(value) {
          console.log('server res', value)
        },
      })
  }

}
