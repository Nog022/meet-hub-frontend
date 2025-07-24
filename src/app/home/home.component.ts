import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  nomeCompanhia: string = 'Companhhia';
  reservas: any[] = [];
  displayedColumns: string[] = ['data', 'local', 'sala', 'capacidadeMaxima', 'inicio', 'fim', 'nomeResponsavel' ];

  constructor(private router: Router, private homeService: HomeService, ) {}

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
}
