import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-sala',
  standalone: false,
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.scss'
})
export class SalaComponent {
  formSala!: FormGroup;

  // Lista fixa com as opções de recursos disponíveis
  recursosDisponiveis: string[] = ['Projetor', 'TV', 'Lousa', 'Ar-condicionado', 'Som'];
  recursosSelecionados: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formSala = this.fb.group({
      name: ['', Validators.required],
      capacidadeMaxima: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  adicionarRecurso(recurso: string): void {
    if (recurso && !this.recursosSelecionados.includes(recurso)) {
      this.recursosSelecionados.push(recurso);
    }
  }

  removerRecurso(recurso: string): void {
    this.recursosSelecionados = this.recursosSelecionados.filter(r => r !== recurso);
  }

}
