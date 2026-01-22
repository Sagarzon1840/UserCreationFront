import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { PersonaResponse } from '../../models/persona.interface';

@Component({
  selector: 'app-personas-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personas-list.component.html',
  styleUrl: './personas-list.component.css',
})
export class PersonasListComponent implements OnInit, OnDestroy {
  personas = signal<PersonaResponse[]>([]);
  filtroForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  private personaCreadaListener: any;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
  ) {
    this.filtroForm = this.fb.group({
      desde: [''],
      hasta: [''],
    });
  }

  ngOnInit(): void {
    this.loadPersonas();

    // Escuchar evento de persona creada
    this.personaCreadaListener = () => this.loadPersonas();
    window.addEventListener('personaCreada', this.personaCreadaListener);
  }

  ngOnDestroy(): void {
    if (this.personaCreadaListener) {
      window.removeEventListener('personaCreada', this.personaCreadaListener);
    }
  }

  loadPersonas(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const desde = this.filtroForm.value.desde;
    const hasta = this.filtroForm.value.hasta;

    // Convertir a ISO string si hay valores
    const desdeISO = desde ? new Date(desde).toISOString() : undefined;
    const hastaISO = hasta ? new Date(hasta).toISOString() : undefined;

    this.personasService.getCreadas(desdeISO, hastaISO).subscribe({
      next: (data) => {
        this.personas.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al cargar las personas. Intente nuevamente.');
        console.error('Error al cargar personas:', error);
      },
    });
  }

  onFiltrar(): void {
    this.loadPersonas();
  }

  onLimpiarFiltros(): void {
    this.filtroForm.reset();
    this.loadPersonas();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
