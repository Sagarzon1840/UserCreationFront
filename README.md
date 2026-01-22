# UserCreation Frontend - Angular

Frontend Angular para la API de UserCreation con arquitectura hexagonal.

## 🚀 Características

- ✅ **Angular 20** con arquitectura standalone components
- 🎨 **Tailwind CSS** para estilos
- 🔐 **Autenticación JWT** con interceptores
- 🛡️ **Guards** para rutas protegidas
- 📝 **Reactive Forms** con validaciones
- 🔄 **HttpClient** para llamadas API
- 📱 **Responsive Design** (mobile-first)

## 🏗️ Arquitectura

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── persona-form/
│   │   ├── usuario-form/
│   │   └── personas-list/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── personas.service.ts
│   │   └── usuarios.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   ├── auth.interface.ts
│   │   ├── persona.interface.ts
│   │   └── usuario.interface.ts
│   └── app.routes.ts
└── environments/
    ├── environment.ts
    └── environment.development.ts
```

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Edita el archivo `.env` con la URL de tu API:

```env
API_URL=https://localhost:7124/api
```

Para AWS, edita `.env` con la URL de producción:

```env
API_URL=https://tu-api-aws.com/api
```

### 3. Ejecutar en desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 🔐 Autenticación

### Credenciales por defecto

- **Usuario**: `admin`
- **Contraseña**: `Admin123!`

### Flujo de autenticación

1. El usuario hace login en `/login`
2. El backend retorna un JWT token
3. El token se guarda en localStorage
4. El interceptor agrega automáticamente el token a todas las peticiones
5. Si el token expira (401), se redirige al login

## 🎨 Componentes

### Login Component

Formulario de autenticación con validaciones:

- Usuario mínimo 3 caracteres
- Contraseña mínimo 6 caracteres
- Mensajes de error personalizados
- Loading state durante el login

### Dashboard Component

Layout principal con:

- Header con información del usuario
- Botón de logout
- Formularios para crear personas y usuarios
- Lista de personas creadas con filtros

### Persona Form Component

Formulario para crear personas:

- Nombres y apellidos (obligatorios)
- Tipo de identificación (CC, CE, TI, PP)
- Número de identificación (único)
- Email (único, validado)
- Validaciones en tiempo real

### Usuario Form Component

Formulario para crear usuarios:

- Usuario (único, mínimo 3 caracteres)
- Contraseña (mínimo 6 caracteres, se hashea con BCrypt)
- Persona ID (opcional)

### Personas List Component

Lista de personas con:

- Filtros por rango de fechas
- Tabla responsive con información completa
- Actualización automática al crear nueva persona
- Formato de fechas localizado

## 🔌 Servicios API

### AuthService

```typescript
login(usuario: string, pass: string): Observable<LoginResponse>
logout(): void
isAuthenticated(): boolean
getToken(): string | null
```

### PersonasService

```typescript
create(data: CreatePersonaRequest): Observable<PersonaResponse>
getCreadas(desde?: string, hasta?: string): Observable<PersonaResponse[]>
```

### UsuariosService

```typescript
create(data: CreateUsuarioRequest): Observable<UsuarioResponse>
```

## 🛡️ Seguridad

- ✅ Contraseñas nunca se guardan en el frontend
- ✅ Token JWT en localStorage
- ✅ Interceptor automático para autenticación
- ✅ Guard para proteger rutas
- ✅ Logout limpia todo el localStorage
- ✅ Redirección automática en errores 401

## 🌐 Despliegue en AWS

### Variables de entorno

Para desplegar en AWS, asegúrate de:

1. Actualizar `.env` con la URL de producción
2. Configurar CORS en el backend para aceptar el dominio de AWS
3. Usar HTTPS en producción

### Build para producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/user-creation-front/browser/`

### Opciones de despliegue en AWS

1. **AWS Amplify** (recomendado para Angular)
2. **AWS S3 + CloudFront**
3. **AWS Elastic Beanstalk**

## 📱 Responsive Design

La aplicación es completamente responsive:

- **Mobile**: Formularios apilados, tabla con scroll horizontal
- **Tablet**: Layout mejorado
- **Desktop**: Formularios lado a lado, tabla completa

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🎨 Tailwind CSS

Estilos principales:

- **Colores**: blue (login/personas), green (usuarios), purple (filtros)
- **Botones**: Estados hover, disabled, loading
- **Formularios**: Validación visual, focus states
- **Cards**: Sombras, bordes redondeados

## 🚧 Desarrollo

### Agregar nuevo componente

```bash
ng generate component components/mi-componente --standalone
```

### Agregar nuevo servicio

```bash
ng generate service services/mi-servicio
```

## 📝 Scripts disponibles

```bash
npm start          # Desarrollo
npm run build      # Build de producción
npm run watch      # Build con watch mode
npm run test       # Tests
```

## 🔗 Endpoints del Backend

Base URL: `${API_URL}` (configurado en `.env`)

- `POST /auth/login` - Login
- `POST /personas` - Crear persona (requiere JWT)
- `GET /personas/creadas` - Listar personas (requiere JWT)
- `POST /usuarios` - Crear usuario (requiere JWT)

## 📖 Documentación del Backend

Ver los archivos incluidos en el repositorio del backend:

- `README.md` - Información general
- `FRONTEND_GUIDE.md` - Guía de integración
- `UserCreation.postman_collection.json` - Colección de Postman

## 🤝 Integración con Backend

El frontend está diseñado para integrarse con el backend de UserCreation:

- **Backend**: .NET 8 con arquitectura hexagonal
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT con BCrypt
- **API**: REST con Swagger

---

**Desarrollado con ❤️ usando Angular y Tailwind CSS**
