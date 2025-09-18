import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meet-hub-frontend';
  isAdmin = false;


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
    this.isAdmin = role === 'ADMIN';
  });

  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
  });
  }
}
