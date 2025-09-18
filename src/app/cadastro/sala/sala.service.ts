import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private apiUrlRoom = `${environment.apiUrl}/api/rooms`;
  private apiUrlLocal = `${environment.apiUrl}/api/locations`;

  constructor(private http: HttpClient) { }

  buscarSalasPorLocal(localId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlRoom}/listRoomByLocal/${localId}`);
  }


  cadastrarSala(salaDTO: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlRoom}/save`, salaDTO);
  }

  updateSala(salaDTO: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlRoom}/update`,salaDTO);
  }


  roomById(id: number) {
    return this.http.get<any>(`${this.apiUrlRoom}/roomById/${id}`);
  }


}
