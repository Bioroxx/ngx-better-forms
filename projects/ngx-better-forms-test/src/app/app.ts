import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BetterValidationConditionalExample } from './validation/better-validation-conditional-example/better-validation-conditional-example';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, BetterValidationConditionalExample],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
