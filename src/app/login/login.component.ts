import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NoCompanyDialogComponent } from '../cadastro/no-company-dialog/no-company-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token);  // Salva o token
          localStorage.setItem('userEmail', response.email);
          console.log('Login bem-sucedido! Token:', response.token);

          if (!response.company) {
            const dialogRef = this.dialog.open(NoCompanyDialogComponent);

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.router.navigate(['/cadastro/companhia']);  // Ajuste a rota conforme o seu app
              }
            });
          } else {
            // Se o usuário já tem companhia, segue para o dashboard ou outro lugar
            this.router.navigate(['/dashboard']);  // Ajuste também
          }

        },
        error => {
          console.error('Erro no login', error);
          alert('Login inválido. Verifique suas credenciais.');
        }
      );
    }
  }

  goToCadastro(): void {
    this.router.navigate(['/register']);
  }
}
