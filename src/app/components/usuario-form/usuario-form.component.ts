import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { CreateUsuarioRequest } from '../../models/usuario.interface';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  usuarioForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
  ) {
    this.usuarioForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const usuarioData: CreateUsuarioRequest = {
        usuario: this.usuarioForm.value.usuario,
        pass: this.usuarioForm.value.pass,
      };

      this.usuariosService.create(usuarioData).subscribe({
        next: (response) => {
          this.successMessage = `Usuario creado exitosamente: ${response.usuario}`;
          this.usuarioForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 400) {
            this.errorMessage =
              error.error?.message || 'Error de validación. El usuario ya existe.';
          } else {
            this.errorMessage = 'Error al crear el usuario. Intente nuevamente.';
          }
          console.error('Error al crear usuario:', error);
        },
      });
    }
  }

  // Getters para validación en template
  get usuario() {
    return this.usuarioForm.get('usuario');
  }
  get pass() {
    return this.usuarioForm.get('pass');
  }
}
