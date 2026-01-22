import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { CreatePersonaRequest } from '../../models/persona.interface';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.css',
})
export class PersonaFormComponent {
  personaForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  tiposIdentificacion = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'PP', label: 'Pasaporte' },
  ];

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      numeroIdentificacion: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      tipoIdentificacion: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const personaData: CreatePersonaRequest = this.personaForm.value;

      this.personasService.create(personaData).subscribe({
        next: (response) => {
          this.successMessage = `Persona creada exitosamente: ${response.nombreCompleto} (${response.idCompleto})`;
          this.personaForm.reset();
          this.isLoading = false;

          // Emitir evento para actualizar la lista
          window.dispatchEvent(new CustomEvent('personaCreada'));
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 400) {
            this.errorMessage = error.error?.message || 'Error de validación. Verifique los datos.';
          } else if (error.status === 409) {
            this.errorMessage = 'El email o identificación ya existe en el sistema.';
          } else {
            this.errorMessage = 'Error al crear la persona. Intente nuevamente.';
          }
          console.error('Error al crear persona:', error);
        },
      });
    }
  }

  // Getters para validación en template
  get nombres() {
    return this.personaForm.get('nombres');
  }
  get apellidos() {
    return this.personaForm.get('apellidos');
  }
  get numeroIdentificacion() {
    return this.personaForm.get('numeroIdentificacion');
  }
  get email() {
    return this.personaForm.get('email');
  }
  get tipoIdentificacion() {
    return this.personaForm.get('tipoIdentificacion');
  }
}
