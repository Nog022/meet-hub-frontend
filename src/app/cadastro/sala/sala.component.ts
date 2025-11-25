import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaService } from './sala.service';
import { LocalizacaoService } from '../localizacao/localizacao.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  titulo = 'Cadastrar Sala';
  idEdicao: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private salaService: SalaService,
    private router: Router,
    private localizacaoService: LocalizacaoService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.formSala = this.fb.group({
      name: ['', Validators.required],
      capacidadeMaxima: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      localId: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEdicao = +id;
      this.titulo = 'Editar Sala';

      this.salaService.roomById(this.idEdicao).subscribe({
        next: (data) => {
          this.formSala.patchValue({
            name: data.name,
            capacidadeMaxima: data.capacity,
            localId: data.localId
          });
          this.recursosSelecionados = data.resources || [];
        },
        error: (err) => {
          console.error('Erro ao carregar sala:', err);
          alert('Não foi possível carregar os dados da sala.');
        }
      });
    }

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
    if (this.formSala.valid) {
      this.isLoading = true;
      const salaDTO = {
        id: this.idEdicao ?? null,
        name: this.formSala.value.name,
        capacity: parseInt(this.formSala.value.capacidadeMaxima, 10),
        localId: this.formSala.value.localId,
        resources: this.recursosSelecionados
      };

      if (this.idEdicao) {

        this.salaService.updateSala(salaDTO).subscribe({
          next: () => {
            this.isLoading = false;
            alert('Sala atualizada com sucesso!');
            this.router.navigate(['/sala-detalhe']);
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Erro ao atualizar sala:', err);
            alert('Erro ao atualizar sala.');
          }
        });
      } else {
        this.salaService.cadastrarSala(salaDTO).subscribe({
          next: () => {
            alert('Sala cadastrada com sucesso!');
            this.isLoading = false;
            this.formSala.reset();
            this.recursosSelecionados = [];
            this.router.navigate(['/sala-detalhe']);
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Erro ao salvar sala:', err);
            alert('Erro ao salvar sala.');
          }
        });
      }
    } else {

      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
