import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Importações do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,


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






  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
