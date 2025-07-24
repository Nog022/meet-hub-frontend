import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterRequest, RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent{
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }


  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
          this.isLoading = true;
          const registerData: RegisterRequest = this.registerForm.value;

          this.registerService.register(registerData).subscribe({
            next: (response) => {
              console.log('Registro bem-sucedido!', response);
              this.isLoading = false;
              alert('Registro bem-sucedido! Verifique seu e-mail para ativar sua conta.');
              this.router.navigate(['/login']);
            },
            error: (err) => {

              console.error('Erro ao registrar:', err);
              this.isLoading = false;

            }
          });
        } else {
          console.warn('Formulário inválido');
        }

  }

    irParaLogin(): void {
    this.router.navigate(['/login']);
  }

}
