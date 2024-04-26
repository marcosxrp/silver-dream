import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // httpClient and animation added because didnt work without explicity providing it
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()],
};
