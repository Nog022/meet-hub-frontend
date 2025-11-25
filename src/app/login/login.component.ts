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
  isLoading = false;

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
      this.isLoading = true;

      this.loginService.login(this.loginForm.value).subscribe(
        response => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('company', JSON.stringify(response.institutionDTO));


          if (!response.institutionDTO) {
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
          this.isLoading = false;
          alert('Login inválido. Verifique suas credenciais.');
        }
      );
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/register']);
  }
}
