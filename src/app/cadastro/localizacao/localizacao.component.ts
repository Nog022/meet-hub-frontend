import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizacaoService, ViaCepResponseDTO } from './localizacao.service';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css'],
  standalone: false
})
export class LocalizacaoComponent implements OnInit {

  formLocalizacao!: FormGroup;
  titulo = 'Cadastrar Localização';
  idEdicao: number | null = null;
  constructor(
    private fb: FormBuilder,
    private localizacaoService: LocalizacaoService,
    private router: Router,
    private route: ActivatedRoute
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEdicao = +id;
      this.titulo = 'Editar Localização';
      this.localizacaoService.localById(this.idEdicao).subscribe({
        next: (data) => {
          this.formLocalizacao.patchValue({
            name: data.name,
            cep: data.cep,
            endereco: data.address,
            bairro: data.neighborhood,
            cidade: data.city,
            estado: data.state,
            numero: data.number,
            complemento: data.complement
          });
        },
        error: (err) => {
          console.error('Erro ao carregar localização:', err);
          alert('Não foi possível carregar os dados da localização.');
        }
      });
    }
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
        id: this.idEdicao ?? null,
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

      if (this.idEdicao) {
        localizacaoDTO['id'] = this.idEdicao;
        console.log('é uma edição');
        this.localizacaoService.updateLocalizacao(localizacaoDTO).subscribe({
          next: () => {
            alert('Localização atualizada com sucesso!');
            this.router.navigate(['/localizacao-detalhe']);
          },
          error: (err) => {
            console.error('Erro ao atualizar localização:', err);
            alert('Erro ao atualizar localização.');
          }
        });
      } else {
        this.localizacaoService.cadastrarLocalizacao(localizacaoDTO).subscribe({
          next: () => {
            alert('Localização cadastrada com sucesso!');
            this.router.navigate(['/localizacao-detalhe']);
          },
          error: (err) => {
            console.error('Erro ao cadastrar localização:', err);
            alert('Erro ao cadastrar localização.');
          }
        });
      }
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
