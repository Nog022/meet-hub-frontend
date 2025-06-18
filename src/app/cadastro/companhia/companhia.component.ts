import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
      console.log('Dados enviados:', this.companyForm.value);
      // Aqui você pode implementar o envio dos dados pro backend
    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}
