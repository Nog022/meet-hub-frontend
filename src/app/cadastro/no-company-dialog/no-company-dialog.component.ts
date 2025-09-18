import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-company-dialog',
  templateUrl: './no-company-dialog.component.html',
  styleUrls: ['./no-company-dialog.component.css'],
  standalone: false
})
export class NoCompanyDialogComponent {

  constructor(private dialogRef: MatDialogRef<NoCompanyDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close(true);  // Fecha o dialog retornando "true"
  }
}
