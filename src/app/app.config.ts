import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { requestHandlerInterceptor } from './api/helpers/interseptors/request-handler.interseptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GuestGuard } from './api/helpers/guards/guest.guard';
import { AuthGuard } from './api/helpers/guards/auth.guard';
import { errorHandlerInterceptor } from './api/helpers/interseptors/error-handler.interseptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    AuthGuard,
    GuestGuard,
    provideHttpClient(withInterceptors([requestHandlerInterceptor, errorHandlerInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync()
  ]
};
