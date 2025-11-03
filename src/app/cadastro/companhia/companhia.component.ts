
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDTO, CompanhiaService } from './companhia.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { cnpj } from 'cpf-cnpj-validator';


@Component({
  selector: 'app-companhia',
  templateUrl: './companhia.component.html',
  styleUrls: ['./companhia.component.scss'],
  standalone: false
})
export class CompanhiaComponent {
  companyForm: FormGroup;
  emailDomainInput = new FormControl('');
  emailDomains: string[] = [];
  isEdicao: boolean = false;
  titulo = 'Cadastro da Instituição';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private companhiaService: CompanhiaService,
    private router: Router,
    private authService: AuthService
  ) {
    this.companyForm = this.fb.group({
      cnpj: ['', Validators.required],
      companyName: ['', Validators.required],
      emailDomains: [this.emailDomains, [this.minDomainsValidator()]]
    });
  }

  addDomainFromInput(): void {
    const domain = this.emailDomainInput.value?.trim();
    if (domain && !this.emailDomains.includes(domain)) {
      this.emailDomains.push(domain);
      this.companyForm.get('emailDomains')?.setValue(this.emailDomains);
      this.companyForm.get('emailDomains')?.markAsTouched();
    }
    this.emailDomainInput.setValue('');
  }

  removeEmailDomain(domain: string): void {
    this.emailDomains = this.emailDomains.filter(d => d !== domain);
    this.companyForm.get('emailDomains')?.setValue(this.emailDomains);
    this.companyForm.get('emailDomains')?.markAsTouched();
  }

  minDomainsValidator() {
    return (control: FormControl) => {
      const value = control.value || [];
      return value.length > 0 ? null : { minDomains: true };
    };
  }

  ngOnInit(): void {
    const cnpj = JSON.parse(localStorage.getItem('company') || '{}')?.cnpj
    if (cnpj) {
      this.isEdicao = true;
      this.titulo = 'Edição da Instituição';
      const companyData = JSON.parse(localStorage.getItem('company') || '{}');
      this.emailDomains = companyData?.domain || [];

      this.companyForm.patchValue({
        cnpj: cnpj,
        companyName: companyData?.name || '',
        emailDomains: this.emailDomains
      });


      this.companyForm.get('cnpj')?.disable();
    }
  }


  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isLoading = true;
      /*
      if (!cnpj.isValid(this.companyForm.value.cnpj)) {
        alert("O CNPJ inserido é invalido, insira um CNPJ valido.");
        this.isLoading = false;
        return;
      }
      */
      console.log('Formulário válido:', this.companyForm.value);
      const formValues = this.companyForm.getRawValue();
      const userEmail = localStorage.getItem('userEmail');

      const companyData: CompanyDTO = {
        cnpj: formValues.cnpj,
        name: formValues.companyName,
        domain: this.emailDomains,
        userEmail: userEmail || ''
      };

      if(this.isEdicao) {
        this.companhiaService.atualizarCompanhia(companyData).subscribe(
          response => {
            console.log('Companhia atualizada com sucesso!', response);
            this.isLoading = false;
            alert('Companhia atualizada com sucesso!');
            localStorage.setItem('company', JSON.stringify(response));
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Erro ao atualizar companhia:', error);
            this.isLoading = false;
          }
        )
      }else{
        this.companhiaService.salvarCompanhia(companyData).subscribe(
          response => {
            console.log('Companhia criada com sucesso!', response);
            this.isLoading = false;
            alert('Companhia criada com sucesso!');
            localStorage.setItem('company', JSON.stringify(response));


              if (response.token) {
                localStorage.setItem('token', response.token);
                this.authService.saveToken(response.token);
              }


            this.router.navigate(['/home']);
          },
          error => {
            console.error('Erro ao criar companhia:', error);
            this.isLoading = false;
            if (error.status === 409 && error.error?.error) {
              alert(`⚠️ ${error.error.error}`);
            } else if (error.status === 400) {
              alert('⚠️ Dados inválidos. Verifique os campos e tente novamente.');
            } else {
              alert('❌ Ocorreu um erro inesperado. Tente novamente mais tarde.');
}

          }
        );
      }


    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}
