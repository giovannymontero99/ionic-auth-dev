import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './app/core/interceptors/api.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular'
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from './app/core/auth/services/user.service';
import { StorageService } from './app/core/services/storage.service';


// Define the initialization function
export function initApp() {
  return inject(StorageService).get('token') ? inject(UserService).getCurrentUser() : EMPTY;
}


bootstrapApplication(AppComponent, {
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy },
      importProvidersFrom(
      IonicStorageModule.forRoot(),
    ),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
    provideAppInitializer(initApp)
  ],
});
