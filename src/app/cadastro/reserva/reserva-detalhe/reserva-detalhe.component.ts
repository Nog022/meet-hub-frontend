import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from '../../../home/home.service';

@Component({
  selector: 'app-reserva-detalhe',
  standalone: false,
  templateUrl: './reserva-detalhe.component.html',
  styleUrl: './reserva-detalhe.component.scss'
})
export class ReservaDetalheComponent implements OnInit {
  reservas: any[] = [];
  selectedReserva: any;
  loading = true;
  error = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public reservaId: number,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<ReservaDetalheComponent>
  ) { }

  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('company') || '{}')?.id;
    console.log('Carregando detalhes para reserva ID:', this.reservaId, 'e company ID:', companyId);
    this.homeService.listarReservasAnteriores(companyId, null).subscribe({
      next: (r) => {
        this.reservas = r;
        this.selectedReserva = this.reservas.find(res => res.id === this.reservaId);
        if (!this.selectedReserva) {
          console.warn(`Reserva com id ${this.reservaId} não encontrada.`);
          this.error = true;
        }
        this.loading = false;
        console.log('Detalhe da reserva:', this.selectedReserva);
      },
      error: (e) => {
        console.error('Erro ao carregar detalhe da reserva', e);
        this.error = true;
        this.loading = false;
      }
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
