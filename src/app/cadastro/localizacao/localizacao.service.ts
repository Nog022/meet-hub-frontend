import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface ViaCepResponseDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  private apiUrl = `${environment.apiUrl}/api/locations`;

  constructor(private http: HttpClient) {}

  cadastrarLocalizacao(localizacao: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, localizacao);

  }

  listarLocalizacoes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarInformacoesCep(cep: string): Observable<any> {
    console.log(`Buscando informações para o CEP: ${cep}`);
    return this.http.get<ViaCepResponseDTO>(`${this.apiUrl}/findAddressByZipCode/${cep}`);
  }

  buscarLocalizacoesPorCompanhia(companyId: number): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/listLocalByInstitution/${companyId}`).toPromise();
  }

  updateLocalizacao(localizacao: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`,localizacao);
  }


  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/localById/${id}`);
  }


}
