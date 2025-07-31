import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizacaoService, ViaCepResponseDTO } from './localizacao.service';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css'],
  standalone: false
})
export class LocalizacaoComponent implements OnInit {

  formLocalizacao!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localizacaoService: LocalizacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLocalizacao = this.fb.group({
      name: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      numero: ['', Validators.required],

      complemento: ['']
    });
  }

  buscarCep(): void {
    const cep = this.formLocalizacao.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.localizacaoService.buscarInformacoesCep(cep).subscribe({
        next: (data: ViaCepResponseDTO) => {
          this.formLocalizacao.patchValue({
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            complemento: data.complemento
          });
        },
        error: (err) => {
          console.error('Erro ao buscar o CEP:', err);
          alert('CEP não encontrado.');
        }
      });
    }
  }


  onSubmit(): void {
    if (this.formLocalizacao.valid) {
    const companyJson = localStorage.getItem('company');

    if (!companyJson) {
      alert('Empresa não encontrada no localStorage.');
      return;
    }

    const company = JSON.parse(companyJson);
    const companyId = company.id;

      const localizacaoDTO = {
      name: this.formLocalizacao.value.name,
      cep: this.formLocalizacao.value.cep,
      address: this.formLocalizacao.value.endereco,
      neighborhood: this.formLocalizacao.value.bairro,
      city: this.formLocalizacao.value.cidade,
      state: this.formLocalizacao.value.estado,
      number: this.formLocalizacao.value.numero,
      complement: this.formLocalizacao.value.complemento,
      institutionId: companyId
    };

    alert('Formulário válido!');
    console.log('Formulário enviado:', localizacaoDTO);

    this.localizacaoService.cadastrarLocalizacao(localizacaoDTO).subscribe({
      next: () => {
        alert('Localização cadastrada com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar localização:', err);
        alert('Erro ao cadastrar localização.');
      }
    });
  } else {
    alert('Preencha todos os campos obrigatórios.');
  }

  }
}
