import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from './reserva.service';
import { LocalizacaoService } from '../localizacao/localizacao.service';
import { SalaService } from '../sala/sala.service';
import { Router } from '@angular/router';
import { NgxMatTimepickerFormatType } from 'ngx-mat-timepicker';
import { MatDialog } from '@angular/material/dialog';
import { ReservaDialogComponent } from '../../dialogs/reserva-dialog/reserva-dialog.component';

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
  isLoading = false;
  timeFormat: NgxMatTimepickerFormatType = 24;
  salaSelecionada!: number;
  dataSelecionada!: string;
  minDate: Date = new Date();



  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private localizacaoService: LocalizacaoService,
    private salaService: SalaService,
    private router: Router,
    private dialog: MatDialog
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


  abrirReservasDoDia(event: any) {
    const salaId = this.formReserva.value.salaId;
    const dataSelecionada: Date = event.value;


    const dataFormatada = dataSelecionada.toISOString().split('.')[0];
    console.log('Data formatada para consulta:', dataFormatada);
    console.log('Sala ID para consulta:', salaId);

    this.reservaService.getReservasPorSalaEData(salaId, dataFormatada)
      .subscribe(reservas => {
        this.dialog.open(ReservaDialogComponent, {
          width: '400px',
          data: { reservas, data: dataFormatada }
        });
      });
  }

  onSubmit(): void {
    if (this.formReserva.valid) {
      const { horaInicio, horaFim } = this.formReserva.value;

      const inicio = new Date(`1970-01-01T${horaInicio}`);
      const fim = new Date(`1970-01-01T${horaFim}`);

      if (fim <= inicio) {
        alert('O horário final deve ser posterior ao horário inicial.');
        return;
      }

      this.isLoading = true;
      const reservaDTO = {
        roomId: this.formReserva.value.salaId,
        date: this.formReserva.value.dataReserva,
        startTime: this.formReserva.value.horaInicio,
        endTime: this.formReserva.value.horaFim,
        eventDescription: this.formReserva.value.descricao,
        personName: this.formReserva.value.nomeResponsavel,
        institutionId: JSON.parse(localStorage.getItem('company') || '{}')?.id
      };

      console.log('Reserva enviada:', reservaDTO);

      this.reservaService.cadastrarReserva(reservaDTO).subscribe({
        next: () => {
          this.isLoading = false;
          localStorage.setItem('ultimaReserva', JSON.stringify(reservaDTO));
          alert('Reserva criada com sucesso!');
          this.formReserva.reset();
          this.salas = [];
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
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
