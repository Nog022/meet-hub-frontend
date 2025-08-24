import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaDetalheService {

  private apiUrl = `${environment.apiUrl}/api/rooms`;

  constructor(private http: HttpClient) {}

  buscarSalasPorIntituicao(companyId: number): Promise<any[]> {
    return firstValueFrom(
      this.http.get<any[]>(`${this.apiUrl}/listRoomByInstitution/${companyId}`)
    );
  }


}
