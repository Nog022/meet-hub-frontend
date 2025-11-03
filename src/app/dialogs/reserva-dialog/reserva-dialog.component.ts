import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-dialog',
  standalone: false,
  templateUrl: './reserva-dialog.component.html',
  styleUrls: ['./reserva-dialog.component.css']
})
export class ReservaDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Reservas recebidas no dialog:', this.data.reservas);
  }

}
