import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  reservas: any[] = [];
  displayedColumns: string[] = ['data', 'local', 'sala' ];

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  criarReserva(): void {
    this.router.navigate(['/cadastro/reserva']);

  }

  carregarReservas(): void {
    this.homeService.listarReservasAnteriores().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Erro ao carregar reservas:', error);
      }
    );
  }
}
