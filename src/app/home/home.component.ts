import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';
import { ReservaDetalheComponent } from '../cadastro/reserva/reserva-detalhe/reserva-detalhe.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  nomeCompanhia: string = 'Companhhia';
  reservas: any[] = [];
  displayedColumns: string[] = ['data', 'local', 'sala', 'capacidadeMaxima', 'inicio', 'fim', 'nomeResponsavel','criadoPor','acoes'];

  constructor(private router: Router, private homeService: HomeService, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.nomeCompanhia = JSON.parse(localStorage.getItem('company') || '{}')?.name
    this.carregarReservas();
  }

  criarReserva(): void {
    this.router.navigate(['/cadastro/reserva']);

  }

  formatarHora(hora: string): string {
    return hora?.slice(0, 5);
  }

  podeDeletar(reserva: any): boolean {
    const userRole = this.authService.getRole();
    const userIdLogado = this.authService.getUserId();

    if (!userRole || !userIdLogado) {
      return false;
    }
    return userRole === 'ADMIN' || reserva.userDTO.id === userIdLogado;
  }

  deletarReserva(reservaId: number): void {
    console.log('Excluir reserva com ID:', reservaId);
    this.homeService.excluirReserva(reservaId).subscribe(() => this.carregarReservas());

  }



  carregarReservas(): void {
    const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id;

    this.homeService.listarReservasAnteriores(companyId).subscribe(
      (data) => {
        this.reservas = data;
        console.log('Reservas carregadas:', data);
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
      }
    );
  }

  verDetalhes(reservas: any): void {
    this.dialog.open(ReservaDetalheComponent, {
      width: '560px',
      data: reservas.id,
      autoFocus: false
    });
  }
}
