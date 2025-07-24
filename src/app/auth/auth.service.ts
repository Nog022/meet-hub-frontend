import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor() {
    this.loadRoleFromToken();
  }

  private loadRoleFromToken() {
    const token = localStorage.getItem('token');
    console.log('Token loaded:', token);
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded payload:', payload);
    this.roleSubject.next(payload.role);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadRoleFromToken();
  }

  isAdmin(): boolean {
    return this.roleSubject.value === 'ADMIN';
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }
}
