import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

export interface CompanyDTO {
  cnpj: string;
  name: string;
  domain: string[];
  userEmail: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanhiaService {
  private apiUrl = `${environment.apiUrl}/institution/save`;

  constructor(private http: HttpClient) {}

  salvarCompanhia(companyData: CompanyDTO): Observable<CompanyDTO> {
    return this.http.post<CompanyDTO>(`${this.apiUrl}`, companyData);
  }
}
