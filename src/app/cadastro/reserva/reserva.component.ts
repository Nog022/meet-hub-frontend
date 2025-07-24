import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from './reserva.service';
import { LocalizacaoService } from '../localizacao/localizacao.service';
import { SalaService } from '../sala/sala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: false,
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent {

  formReserva!: FormGroup;
  locais: any[] = [];
  salas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private localizacaoService: LocalizacaoService,
    private salaService: SalaService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.formReserva = this.fb.group({
      localId: ['', Validators.required],
      salaId: ['', Validators.required],
      nomeResponsavel: ['', Validators.required],
      dataReserva: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      descricao: ['']
    });

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



  buscarSalasPorLocal(): void {
    const localId = this.formReserva.value.localId;
    if (localId) {
      this.salaService.buscarSalasPorLocal(localId).subscribe({
        next: (data) => {
          this.salas = data;
        },
        error: (err) => {
          console.error('Erro ao buscar salas:', err);
        }
      });
    }
  }


  onSubmit(): void {
  if (this.formReserva.valid) {
    const reservaDTO = {
      roomId: this.formReserva.value.salaId,
      date: this.formReserva.value.dataReserva,
      startTime: this.formReserva.value.horaInicio,
      endTime: this.formReserva.value.horaFim,
      eventDescription: this.formReserva.value.descricao,
      personName: this.formReserva.value.nomeResponsavel,
      companyId: JSON.parse(localStorage.getItem('company') || '{}')?.id
    };

    console.log('Reserva enviada:', reservaDTO);

    this.reservaService.cadastrarReserva(reservaDTO).subscribe({
      next: () => {
        localStorage.setItem('ultimaReserva', JSON.stringify(reservaDTO));
        alert('Reserva criada com sucesso!');
        this.formReserva.reset();
        this.salas = [];
        this.router.navigate(['/home']);

      },
      error: (err) => {
        console.error('Erro ao criar reserva:', err);
        if (err.status === 409) {
          alert("Horário já reservado. Por favor, escolha outro horário.");
        } else {
          alert("Erro ao reservar. Tente novamente mais tarde.");
        }
      }
    });
  } else {
    alert('Preencha todos os campos obrigatórios.');

    }

  }
}
