import { SalaService } from './../cadastro/sala/sala.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaDetalheService } from './sala-detalhe.service';

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
      private salaDetalheService: SalaDetalheService

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

  editarSalas(): void {
    if (!this.salaSelecionada) return;
    //this.router.navigate(['/cadastro/sala', this.salaSelecionada.id]);
    this.router.navigate(['/cadastro/sala']);
  }

excluirSalas(): void {
  if (!this.salaSelecionada) return;
  alert(`Excluir sala: ${this.salaSelecionada.nome}`);
  console.log('Excluir sala id:', this.salaSelecionada.id);
}
}
