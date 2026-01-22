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

## 🛡️ Seguridad

- ✅ Contraseñas nunca se guardan en el frontend
- ✅ Token JWT en localStorage
- ✅ Interceptor automático para autenticación
- ✅ Guard para proteger rutas
- ✅ Logout limpia todo el localStorage
- ✅ Redirección automática en errores 401
