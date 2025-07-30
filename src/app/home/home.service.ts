import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = `${environment.apiUrl}/api/reservations`;

  constructor(private http: HttpClient) {}

  listarReservasAnteriores(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listReservationsByCompany/${companyId}`);
  }

  excluirReserva(reservaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${reservaId}`);
  }

}
