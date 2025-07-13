// src/app/app.ts
// v1..0.0
// This file is the main entry point for the Angular application.
// It sets up the application configuration, including routing, HTTP client,
// animations, and PrimeNG theme.

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Totals } from './components/totals/totals';
// import { provideHttpClient } from '@angular/common/http'; // For HttpClient app-wide
import { TotalsList } from './components/totals-list/totals-list';
import { DatePicker } from "primeng/datepicker";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [RouterOutlet, TotalsList],
  providers: []
})
export class App {
  protected readonly title = signal('testangular');
}
