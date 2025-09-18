import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = `${environment.apiUrl}/api/reservations`;

  constructor(private http: HttpClient) {}

  listarReservasAnteriores(companyId: number,filtros: any): Observable<any[]> {
    if(filtros === null || filtros === undefined) {
      return this.http.get<any[]>(`${this.apiUrl}/listReservationsByInstitution/${companyId}`);
    }

    let params = new HttpParams();
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<any[]>(`${this.apiUrl}/listReservationsByInstitution/${companyId}`, { params });

  }

  excluirReserva(reservaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${reservaId}`);
  }

}
