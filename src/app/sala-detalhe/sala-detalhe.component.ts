import { SalaService } from './../cadastro/sala/sala.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaDetalheService } from './sala-detalhe.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sala-detalhe',
  standalone: false,
  templateUrl: './sala-detalhe.component.html',
  styleUrl: './sala-detalhe.component.scss'
})
export class SalaDetalheComponent {

  salas: any[] = [];
  salaSelecionada: any | null = null;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private salaDetalheService: SalaDetalheService,
      private dialog: MatDialog,
      public authService: AuthService

    ) {}



  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id

    this.carregarSalas(companyId);
  }

  criarSala(): void {
    this.router.navigate(['/cadastro/sala']);
  }

  carregarSalas(companyId: number ): void {
    this.salaDetalheService.buscarSalasPorIntituicao(companyId).then(
      (data) => {
      this.salas = data;
      console.log('salas carregadas:', data);
    })
    .catch((error) => {
      console.error('Erro ao carregar salas:', error);
    });
  }

  selecionarSalas(sala: any): void {
    this.salaSelecionada = sala;
  }

  editarSalas(id: number): void {
    if (!this.salaSelecionada) return;
    //this.router.navigate(['/cadastro/sala', this.salaSelecionada.id]);
    this.router.navigate(['/cadastro/editar-sala', id]);
  }

  excluirSalas(id: number): void {
    if (!this.salaSelecionada) return;
    console.log('Excluir reserva com ID:', id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza que deseja deletar está sala?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salaDetalheService.excluirSala(id).then(() => {
          const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id
          this.carregarSalas(companyId);
          this.salaSelecionada = null;
        }).catch((error) => {
          console.error('Erro ao excluir sala:', error);
        });
      }
    });

  }
}
