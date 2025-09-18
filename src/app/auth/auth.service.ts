import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();

  private userId: number | null = null;

  constructor() {
    this.loadInfoFromToken();
  }

  private loadInfoFromToken() {
    const token = localStorage.getItem('token');
    console.log('Token loaded:', token);
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded payload:', payload);

    this.roleSubject.next(payload.role);
    this.userId = payload.userId;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loadInfoFromToken();
  }

  isAdmin(): boolean {
    return this.roleSubject.value === 'ADMIN';
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  getUserId(): number | null {
    return this.userId;
  }
}
