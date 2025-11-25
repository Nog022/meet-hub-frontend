import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaDTO } from '../../../models/reserva.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = `${environment.apiUrl}/api/reservations`;

  constructor(private http: HttpClient) { }

  cadastrarReserva(reservaDTO: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, reservaDTO);
  }

  buscarLocalizacoesPorCompanhia(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listLocalByInstitution/${companyId}`);
  }

getReservasPorSalaEData(roomId: number, date: string): Observable<ReservaDTO[]> {
  return this.http.get<ReservaDTO[]>(`${this.apiUrl}/listReservationsByRoomAndDate/${roomId}/${date}`);
}




}
