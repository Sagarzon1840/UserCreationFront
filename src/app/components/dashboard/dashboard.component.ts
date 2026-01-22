import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { PersonasListComponent } from '../personas-list/personas-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PersonaFormComponent, UsuarioFormComponent, PersonasListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'Usuario';
  }

  onLogout(): void {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
