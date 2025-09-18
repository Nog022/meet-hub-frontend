import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';
import { ReservaDetalheComponent } from '../cadastro/reserva/reserva-detalhe/reserva-detalhe.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

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
  filtroForm!: FormGroup;
  mostrarFiltros = false;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder

  ) {}

  ngOnInit(): void {
    this.nomeCompanhia = JSON.parse(localStorage.getItem('company') || '{}')?.name

    this.filtroForm = this.fb.group({
      date: [''],
      capacity: [''],
      roomName: [''],
      localName: ['']
    });

    console.log("formulario de filtro criado:", this.filtroForm);
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza que deseja deletar está reserva?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.homeService.excluirReserva(reservaId).subscribe(() => this.carregarReservas());
        console.log('Usuário deletado:', reservaId);

      } else {
        console.log('Cancelado');
      }
    });


  }



  carregarReservas(): void {
    const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id;
    const filtros = this.filtroForm.value;
    const filtrosParaEnvio = {
    ...filtros,
    date: this.formatDateToISO(filtros.date),
    capacity: filtros.capacity || null,
    roomName: filtros.roomName || null,
    localName: filtros.localName || null
  };
    console.log('Carregando reservas para a companhia ID:', companyId, 'com filtros:', filtrosParaEnvio);
    this.homeService.listarReservasAnteriores(companyId, filtrosParaEnvio).subscribe(
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

  limparFiltros(): void {
    this.filtroForm.reset();
    this.carregarReservas();
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  private formatDateToISO(date: any): string | null {
  if (!date) {
    return null;
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


}
