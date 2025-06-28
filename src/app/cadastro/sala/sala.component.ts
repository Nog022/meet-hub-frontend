import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaService } from './sala.service';
import { LocalizacaoService } from '../localizacao/localizacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala',
  standalone: false,
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {
  formSala!: FormGroup;

  locais: any[] = [];

  recursosDisponiveis: string[] = ['Projetor', 'TV', 'Lousa', 'Ar-condicionado', 'Som'];
  recursosSelecionados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private salaService: SalaService,
    private router: Router,
    private localizacaoService: LocalizacaoService
  ) {}

  ngOnInit(): void {
    this.formSala = this.fb.group({
      name: ['', Validators.required],
      capacidadeMaxima: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      localId: ['', Validators.required]
    });

    const companyJson = localStorage.getItem('company');
    if (companyJson) {
      const company = JSON.parse(companyJson);
      const companyId = company.id;

      this.localizacaoService.buscarLocalizacoesPorCompanhia(companyId)
        .then((data) => {
          this.locais = data;
          console.log('Locais carregados:', this.locais);
        })
        .catch((err) => {
          console.error('Erro ao buscar locais:', err);
        });
    }
  }


  adicionarRecurso(recurso: string): void {
    if (recurso && !this.recursosSelecionados.includes(recurso)) {
      this.recursosSelecionados.push(recurso);
    }
  }

  removerRecurso(recurso: string): void {
    this.recursosSelecionados = this.recursosSelecionados.filter(r => r !== recurso);
  }

  onSubmit(): void {
    console.log('Formulário enviado:', this.formSala.value);
    if (this.formSala.valid) {
      const salaDTO = {
        name: this.formSala.value.name,
        capacity: parseInt(this.formSala.value.capacidadeMaxima, 10),
        localId: this.formSala.value.localId,
        resources: this.recursosSelecionados
      };

      console.log('Sala enviada:', salaDTO);

      this.salaService.cadastrarSala(salaDTO).subscribe({
        next: () => {
          alert('Sala cadastrada com sucesso!');
          this.formSala.reset();
          this.recursosSelecionados = [];
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao salvar sala:', err);
          alert('Erro ao salvar sala.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
