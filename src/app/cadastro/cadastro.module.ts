import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { SalaComponent } from './sala/sala.component';
import { CompanhiaComponent } from './companhia/companhia.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    LocalizacaoComponent,
    SalaComponent,
    CompanhiaComponent
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule



  ]
})
export class CadastroModule { }
