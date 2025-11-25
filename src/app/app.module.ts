import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalizacaoDetalheComponent } from './localizacao-detalhe/localizacao-detalhe.component';
import { SalaDetalheComponent } from './sala-detalhe/sala-detalhe.component';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ReservaDialogComponent } from './dialogs/reserva-dialog/reserva-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LocalizacaoDetalheComponent,
    SalaDetalheComponent,
    ConfirmDialogComponent,
    ReservaDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatDialogModule


  ],
  exports: [
    ConfirmDialogComponent
    ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
