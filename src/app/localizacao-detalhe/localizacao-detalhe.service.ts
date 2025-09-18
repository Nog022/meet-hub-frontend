import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoDetalheService {

  private apiUrl = `${environment.apiUrl}/api/locations`;

  constructor(private http: HttpClient) {}


  excluirLocalizacao(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
    );
  }

}
