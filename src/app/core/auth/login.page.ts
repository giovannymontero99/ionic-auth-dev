import { Component, viewChild, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonList, IonInput, IonCardContent, IonCard, IonCardTitle, IonButton, IonToast } from '@ionic/angular/standalone';
import { AuthForm } from './interfaces/authForm';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonToast, IonButton, IonCard, IonCardContent, IonInput, IonList, IonItem, IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage {

  authForm: FormGroup<AuthForm>;

  constructor(
    private authService : AuthService,
    private router : Router,
    public toastController: ToastController

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

  async presentErrorToast(error: any ) {
    const toast = await this.toastController.create({
      message: error.error.message,
      duration: 1500,
      position: 'top' ,
      color: 'danger'
    });

    await toast.present();
  }


  submitForm(){
    this.authService
      .login( this.authForm.value as {email:string,password: string} )
      .subscribe({
        next: ()=>{
          this.router.navigate(['/home'])
          return
        },
        error: async (err) => {
          await this.presentErrorToast(err)
        }
      })
  }




}
