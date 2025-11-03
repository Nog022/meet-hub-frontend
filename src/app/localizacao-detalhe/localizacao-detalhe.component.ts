import { LocalizacaoDetalheService } from './localizacao-detalhe.service';
import { LocalizacaoService } from './../cadastro/localizacao/localizacao.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

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
    private localizacaoService: LocalizacaoService,
    private dialog: MatDialog,
    private localizacaoDetalheService: LocalizacaoDetalheService,
    public authService: AuthService

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

  editarLocalizacao(id: number): void {
    if (!this.localizacaoSelecionada) return;
    this.router.navigate(['/cadastro/editar-localizacao', id]);

  }

  excluirLocalizacao(id: number): void {
    if (!this.localizacaoSelecionada) return;
    console.log('Excluir reserva com ID:', id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza que deseja deletar está localização?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.localizacaoDetalheService.excluirLocalizacao(id).then(() => this.carregarLocalizacoes(JSON.parse(localStorage.getItem('company') || '{}')?.id));
        this.carregarLocalizacoes(JSON.parse(localStorage.getItem('company') || '{}')?.id);
        this.localizacaoSelecionada = null;
        console.log('Usuário deletado:', id);

      } else {
        console.log('Cancelado');
      }
    });
    console.log('Excluir localizacao id:', this.localizacaoSelecionada.id);
  }
}
