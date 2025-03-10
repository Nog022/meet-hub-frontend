import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Importações do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule,  // Botão do Angular Material
    MatInputModule,   // Campo de entrada do Angular Material
    ReactiveFormsModule, // Módulo de formulários reativos
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
