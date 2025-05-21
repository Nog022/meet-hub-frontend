import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface RegisterRequest {
  username: string;
  cpf: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private apiUrl = `${environment.apiUrl}/auth/register`;

    constructor(private http: HttpClient) {}

    register(data: RegisterRequest): Observable<any> {
      console.log('Chegou aqui  ');
      return this.http.post(this.apiUrl, data);
    }
}
