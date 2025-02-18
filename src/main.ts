import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, Router } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './app/core/interceptors/api.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular'
import { importProvidersFrom, Inject, inject, provideAppInitializer } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { UserService } from './app/core/auth/services/user.service';
import { StorageService } from './app/core/services/storage.service';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { tokenInterceptor } from './app/core/interceptors/token.interceptor';


// Define the initialization function
export function initApp() {

  return inject(StorageService).get('token') ?
    inject(UserService).getCurrentUser().pipe(
      catchError(err => {
        return EMPTY;
      })
    ) : EMPTY;
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
      withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor])
    ),
    provideAppInitializer(initApp)
  ],
});
