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

  buscarLocalizacoesPorCompanhia(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlLocal}/listLocalByCompany/${companyId}`);
  }

  cadastrarSala(salaDTO: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlRoom}/save`, salaDTO);
  }

}
