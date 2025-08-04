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
import { MatDialogModule } from '@angular/material/dialog';
import { NoCompanyDialogComponent } from './no-company-dialog/no-company-dialog.component';
import { ReservaComponent } from './reserva/reserva.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { ReservaDetalheComponent } from './reserva/reserva-detalhe/reserva-detalhe.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LocalizacaoComponent,
    SalaComponent,
    CompanhiaComponent,
    NoCompanyDialogComponent,
    ReservaComponent,
    ReservaDetalheComponent
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
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroModule { }
