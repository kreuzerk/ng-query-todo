import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";

import { routes } from './app.routes';
import {provideAngularQuery, QueryClient} from "@tanstack/angular-query-experimental";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAngularQuery(new QueryClient())]
};
