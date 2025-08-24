import { LocalizacaoService } from './../cadastro/localizacao/localizacao.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-localizacao-detalhe',
  standalone: false,
  templateUrl: './localizacao-detalhe.component.html',
  styleUrl: './localizacao-detalhe.component.scss'
})
export class LocalizacaoDetalheComponent {
  localizacoes: any[] = [];
  localizacaoSelecionada: any | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private localizacaoService: LocalizacaoService

  ) {}

  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id

    this.carregarLocalizacoes(companyId);
  }

  criarLocalizacao(): void {
    this.router.navigate(['/cadastro/localizacao']);
  }

  carregarLocalizacoes(companyId: number ): void {
    this.localizacaoService.buscarLocalizacoesPorCompanhia(companyId).then(
      (data) => {
      this.localizacoes = data;
      console.log('Localizacoes carregadas:', data);
    })
    .catch((error) => {
      console.error('Erro ao carregar localizacoes:', error);
    });
  }

  selecionarLocalizacao(localizacao: any): void {
    this.localizacaoSelecionada = localizacao;
  }

    editarLocalizacao(): void {
    if (!this.localizacaoSelecionada) return;
    this.router.navigate(['/cadastro/localizacao', this.localizacaoSelecionada.id]);
  }

  excluirLocalizacao(): void {
    if (!this.localizacaoSelecionada) return;
    alert(`Excluir localização: ${this.localizacaoSelecionada.nome}`);
    console.log('Excluir localizacao id:', this.localizacaoSelecionada.id);
  }
}
