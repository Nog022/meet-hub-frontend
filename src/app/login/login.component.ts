import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NoCompanyDialogComponent } from '../cadastro/no-company-dialog/no-company-dialog.component';
import { AuthService } from '../auth/auth.service';


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
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('company', JSON.stringify(response.company));
          console.log('Login bem-sucedido! Token:', response.token);

          if (!response.company) {
            const dialogRef = this.dialog.open(NoCompanyDialogComponent);

            dialogRef.afterClosed().subscribe(result => {
              if (result) {

                this.router.navigate(['/cadastro/companhia']);
              }
            });
          } else {
            this.authService.saveToken(response.token);

            this.router.navigate(['/home']);
          }

        },
        error => {
          console.error('Erro no login', error);
          alert('Login inválido. Verifique suas credenciais.');
        }
      );
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/register']);
  }
}
