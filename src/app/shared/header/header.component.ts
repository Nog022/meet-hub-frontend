import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    constructor(private router: Router) {}
  @Output() toggleSidenav = new EventEmitter<void>();

    shouldShowMenuButton(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl.includes('/login') || currentUrl.includes('/register'));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
