import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AngularQueryDevtools} from "@tanstack/angular-query-devtools-experimental";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  template: `
    <div class="container">
      <h1 class="title">
    <span class="material-symbols-outlined title-icon">fact_check</span>
        Todos App</h1>
      <router-outlet/>
    </div>
    <angular-query-devtools initialIsOpen />
  `
})
export class AppComponent {
}
