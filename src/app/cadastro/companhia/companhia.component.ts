
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyDTO, CompanhiaService } from './companhia.service';
import { Router } from '@angular/router';



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

  constructor(
    private fb: FormBuilder,
    private companhiaService: CompanhiaService,
    private router: Router
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


  onSubmit(): void {
    if (this.companyForm.valid) {
      console.log('Formulário válido:', this.companyForm.value);
      const userEmail = localStorage.getItem('userEmail');  // Exemplo: Pegando email do localStorage (ajuste conforme seu fluxo)

      const companyData: CompanyDTO = {
        cnpj: this.companyForm.value.cnpj,
        name: this.companyForm.value.companyName,
        domain: this.emailDomains,
        userEmail: userEmail || ''
      };

      this.companhiaService.salvarCompanhia(companyData).subscribe(
        response => {
          console.log('Companhia criada com sucesso!', response);
          alert('Companhia criada com sucesso!');
          //this.router.navigate(['/alguma-rota-depois']);  colocar a rota depois
        },
        error => {
          console.error('Erro ao criar companhia:', error);
        }
      );

    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}
