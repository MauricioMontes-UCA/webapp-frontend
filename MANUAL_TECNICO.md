# Manual Técnico - El Último Párrafo (Frontend)

## Información del Proyecto

**Nombre**: El Último Párrafo - Frontend  
**Repositorio**: webapp-frontend  
**Tecnología Principal**: React 19 + Vite  
**Versión**: 0.0.0  
**Fecha**: Noviembre 2025

---

## Tabla de Contenidos

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Requisitos Técnicos](#requisitos-técnicos)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Tecnologías y Dependencias](#tecnologías-y-dependencias)
6. [Componentes Principales](#componentes-principales)
7. [Routing y Navegación](#routing-y-navegación)
8. [Estilos y Diseño](#estilos-y-diseño)
9. [Variables de Entorno](#variables-de-entorno)
10. [Scripts Disponibles](#scripts-disponibles)
11. [Desarrollo](#desarrollo)
12. [Build y Deployment](#build-y-deployment)
13. [Testing](#testing)
14. [Linting y Code Quality](#linting-y-code-quality)
15. [Optimización y Performance](#optimización-y-performance)
16. [Resolución de Problemas](#resolución-de-problemas)
17. [Contribución](#contribución)
18. [API y Backend](#api-y-backend)

---

## Arquitectura del Sistema

### Patrón de Diseño
El proyecto utiliza una arquitectura basada en componentes con React, siguiendo el patrón:
- **Component-Based Architecture**: Componentes reutilizables y modulares
- **Single Page Application (SPA)**: Navegación sin recargas de página
- **Client-Side Routing**: React Router DOM para manejo de rutas

### Estructura de Capas
```
┌─────────────────────────────────┐
│     Presentation Layer          │
│   (Components & Pages)          │
├─────────────────────────────────┤
│     Routing Layer               │
│   (React Router DOM)            │
├─────────────────────────────────┤
│     State Management            │
│   (React Hooks/Context)         │
├─────────────────────────────────┤
│     API Integration             │
│   (Fetch/Axios - Future)        │
└─────────────────────────────────┘
```

---

## Requisitos Técnicos

### Software Requerido

| Software | Versión Mínima | Versión Recomendada |
|----------|----------------|---------------------|
| Node.js | 18.x | 20.x o superior |
| npm | 9.x | 10.x o superior |
| Git | 2.30+ | Última versión |

### Sistema Operativo
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 20.04+, Fedora, etc.)

### Editor Recomendado
- **Visual Studio Code** con las siguientes extensiones:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Auto Rename Tag
  - Path Intellisense

---

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MauricioMontes-UCA/webapp-frontend.git
cd webapp-frontend
```

### 2. Cambiar a la Rama de Desarrollo

```bash
git checkout develop
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=El Último Párrafo
VITE_APP_VERSION=1.0.0
```

### 5. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## Estructura del Proyecto

```
webapp-frontend/
├── .git/                      # Control de versiones
├── .gitignore                 # Archivos ignorados por Git
├── eslint.config.js          # Configuración de ESLint
├── index.html                # Punto de entrada HTML
├── package.json              # Dependencias y scripts
├── package-lock.json         # Lock file de dependencias
├── vite.config.js            # Configuración de Vite
├── README.md                 # Documentación básica
├── MANUAL_USUARIO.md         # Manual de usuario
├── MANUAL_TECNICO.md         # Manual técnico (este archivo)
│
├── public/                   # Archivos estáticos públicos
│   ├── vite.svg             # Logo de Vite
│   └── [otros assets]
│
└── src/                      # Código fuente
    ├── main.jsx             # Punto de entrada de React
    ├── App.jsx              # Componente principal
    ├── App.css              # Estilos del App
    ├── index.css            # Estilos globales
    │
    ├── assets/              # Recursos (imágenes, fuentes, etc.)
    │
    ├── components/          # Componentes reutilizables
    │   ├── BookCard/       # Tarjeta de libro
    │   ├── Button/         # Botón personalizado
    │   ├── Checkbox/       # Checkbox personalizado
    │   ├── FeatureCard/    # Tarjeta de características
    │   ├── Footer/         # Pie de página
    │   ├── Header/         # Encabezado
    │   └── InputField/     # Campo de entrada
    │
    ├── pages/              # Páginas/Vistas
    │   ├── Home/          # Página principal
    │   └── Login/         # Página de login
    │
    └── styles/            # Estilos globales y temas
```

### Convenciones de Nombres
- **Componentes**: PascalCase (ej: `BookCard.jsx`)
- **Archivos de estilo**: camelCase o matching component name
- **Utilidades**: camelCase (ej: `apiHelper.js`)
- **Constantes**: UPPER_SNAKE_CASE

---

## Tecnologías y Dependencias

### Dependencias de Producción

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5",
  "dotenv": "^17.2.3"
}
```

#### React 19.1.1
- Biblioteca principal para construir interfaces de usuario
- Incluye nuevas características como React Compiler
- Hooks modernos y mejor performance

#### React Router DOM 7.9.5
- Sistema de routing para Single Page Applications
- Manejo de navegación cliente
- Protección de rutas y lazy loading

#### dotenv 17.2.3
- Gestión de variables de entorno
- Configuración segura de credenciales

### Dependencias de Desarrollo

```json
{
  "@vitejs/plugin-react": "^5.0.4",
  "vite": "^7.1.7",
  "eslint": "^9.36.0",
  "babel-plugin-react-compiler": "^19.1.0-rc.3"
}
```

#### Vite 7.1.7
- Build tool ultrarrápido
- Hot Module Replacement (HMR)
- Optimización de bundles
- Dev server con ESM nativo

#### ESLint 9.36.0
- Linter para JavaScript/JSX
- Detección de errores y problemas de estilo
- Configuración extensible

#### Babel React Compiler
- Compilador experimental de React
- Optimización automática de componentes
- Mejora de performance

---

## Componentes Principales

### App.jsx
Componente raíz de la aplicación.

```jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Home'
import Login from './pages/Login/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
```

### Componentes Reutilizables

#### BookCard
Tarjeta para mostrar información de un libro.

**Props esperados**:
- `title`: string - Título del libro
- `author`: string - Autor del libro
- `cover`: string - URL de la portada
- `onClick`: function - Callback al hacer clic

#### Button
Botón personalizado con diferentes variantes.

**Props esperados**:
- `children`: node - Contenido del botón
- `variant`: string - Estilo del botón (primary, secondary, etc.)
- `onClick`: function - Callback al hacer clic
- `disabled`: boolean - Estado deshabilitado

#### InputField
Campo de entrada personalizado.

**Props esperados**:
- `type`: string - Tipo de input
- `placeholder`: string - Texto placeholder
- `value`: string - Valor del input
- `onChange`: function - Callback al cambiar valor
- `error`: string - Mensaje de error

#### Header
Encabezado de navegación global.

**Funcionalidades**:
- Logo de la aplicación
- Menú de navegación
- Perfil de usuario
- Búsqueda rápida

#### Footer
Pie de página con información adicional.

**Contenido**:
- Enlaces importantes
- Información de contacto
- Redes sociales
- Copyright

---

## Routing y Navegación

### Configuración de Rutas

```jsx
// src/App.jsx
<Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/login" element={<Login />} />
  {/* Rutas futuras */}
  <Route path="/signup" element={<Signup />} />
  <Route path="/books" element={<BooksCatalog />} />
  <Route path="/book/:id" element={<BookDetail />} />
  <Route path="/library" element={<MyLibrary />} />
  <Route path="/search" element={<AdvancedSearch />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/profile" element={<UserProfile />} />
</Routes>
```

### Navegación Programática

```jsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/login');
  };
  
  return <button onClick={handleClick}>Login</button>;
}
```

### Rutas Protegidas (Implementación Futura)

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

---

## Estilos y Diseño

### Sistema de Estilos
El proyecto utiliza CSS modular con las siguientes estrategias:

1. **CSS Global** (`index.css`): Variables, reset, tipografía base
2. **CSS por Componente**: Estilos específicos de cada componente
3. **CSS Modules** (recomendado para nuevos componentes)

### Variables CSS

```css
:root {
  /* Colores */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  
  /* Tipografía */
  --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --font-size-base: 16px;
  --font-size-small: 14px;
  --font-size-large: 20px;
  
  /* Espaciado */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Breakpoints */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1280px;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.component {
  /* Estilos base para móvil */
}

@media (min-width: 768px) {
  .component {
    /* Estilos para tablet */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Estilos para desktop */
  }
}
```

---

## Variables de Entorno

### Archivo .env

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=5000

# Application
VITE_APP_NAME=El Último Párrafo
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# Features Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### Uso en el Código

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

## Scripts Disponibles

### `npm run dev`
Inicia el servidor de desarrollo en modo HMR.
- Puerto: 5173 (por defecto)
- Hot Module Replacement activado
- Source maps disponibles

### `npm run build`
Genera build optimizado para producción.
- Minificación de código
- Tree shaking
- Optimización de assets
- Output: `dist/`

### `npm run preview`
Previsualiza el build de producción localmente.
- Simula entorno de producción
- Útil para testing pre-deployment

### `npm run lint`
Ejecuta ESLint en todos los archivos.
- Detecta errores de sintaxis
- Verifica reglas de estilo
- Reporte de problemas

---

## Desarrollo

### Workflow de Desarrollo

1. **Crear una rama desde develop**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Desarrollar la funcionalidad**
   - Escribir código
   - Probar localmente
   - Hacer commits frecuentes

3. **Commit de cambios**
   ```bash
   git add .
   git commit -m "feat: descripción de la funcionalidad"
   ```

4. **Push a remoto**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. **Crear Pull Request**
   - Hacia la rama `develop`
   - Descripción detallada
   - Screenshots si aplica

### Convenciones de Commits

Usar Conventional Commits:

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan código)
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

Ejemplos:
```
feat: add book search functionality
fix: correct pagination in catalog
docs: update README with installation steps
```

### Hot Module Replacement (HMR)

Vite proporciona HMR automático:
- Los cambios se reflejan instantáneamente
- No se pierde el estado de la aplicación
- Fast Refresh para componentes React

---

## Build y Deployment

### Build para Producción

```bash
npm run build
```

Esto genera:
- Carpeta `dist/` con archivos optimizados
- Assets minificados
- Hashes en nombres de archivo para cache busting
- Source maps (opcional)

### Configuración de Build

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

### Deployment

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
```bash
# Agregar a package.json
"homepage": "https://mauriciomontes-uca.github.io/webapp-frontend"

npm run build
# Subir contenido de dist/ a gh-pages branch
```

### Variables de Entorno en Producción

Configurar en la plataforma de deployment:
- `VITE_API_URL`: URL del backend en producción
- `VITE_APP_ENV`: production
- Otras variables necesarias

---

## Testing

### Configuración de Testing (Recomendado)

Instalar Vitest y React Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Ejemplo de Test

```jsx
// src/components/Button/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Ejecutar Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

---

## Linting y Code Quality

### ESLint Configuration

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'react/prop-types': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  }
]
```

### Ejecutar Linter

```bash
# Verificar errores
npm run lint

# Arreglar errores automáticamente
npm run lint -- --fix
```

### Pre-commit Hooks (Recomendado)

Instalar Husky:

```bash
npm install -D husky lint-staged
npx husky install
```

Configurar `.husky/pre-commit`:

```bash
#!/bin/sh
npx lint-staged
```

---

## Optimización y Performance

### Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const BooksCatalog = lazy(() => import('./pages/BooksCatalog'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BooksCatalog />
    </Suspense>
  );
}
```

### Optimización de Imágenes

- Usar formatos modernos (WebP)
- Lazy loading de imágenes
- Responsive images

```jsx
<img 
  src="book-cover.webp" 
  loading="lazy" 
  alt="Book cover"
/>
```

### Memoización

```jsx
import { memo, useMemo, useCallback } from 'react';

const BookCard = memo(function BookCard({ book }) {
  return <div>{book.title}</div>;
});

function ParentComponent() {
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue();
  }, [dependency]);
  
  const handleClick = useCallback(() => {
    // handle click
  }, []);
}
```

### Bundle Analysis

```bash
npm install -D rollup-plugin-visualizer
```

Configurar en `vite.config.js`:

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

---

## Resolución de Problemas

### Error: Puerto 5173 en uso

```bash
# Cambiar puerto en package.json
"dev": "vite --port 3000"

# O matar el proceso
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Error: Module not found

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: React version mismatch

```bash
# Asegurar versiones consistentes
npm list react react-dom
npm install react@latest react-dom@latest
```

### HMR no funciona

1. Verificar que el archivo está dentro de `src/`
2. Revisar la configuración de Vite
3. Reiniciar el servidor de desarrollo

### Build falla

1. Verificar errores de ESLint
2. Revisar imports rotos
3. Verificar variables de entorno
4. Limpiar cache: `rm -rf dist node_modules && npm install`

---

## Contribución

### Guía de Contribución

1. **Fork el repositorio**
2. **Clonar tu fork**
3. **Crear rama de feature**
4. **Desarrollar y probar**
5. **Commit con mensajes descriptivos**
6. **Push a tu fork**
7. **Crear Pull Request**

### Code Review Checklist

- [ ] El código sigue las convenciones del proyecto
- [ ] Los tests pasan exitosamente
- [ ] No hay warnings de ESLint
- [ ] La documentación está actualizada
- [ ] Los cambios son backwards compatible
- [ ] Performance no se ve afectada negativamente

### Estructura de PR

```markdown
## Descripción
[Descripción breve de los cambios]

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Testing
[Cómo se probaron los cambios]

## Screenshots
[Si aplica]
```

---

## API y Backend

### Integración con Backend

El frontend se conectará con un backend REST API (a implementar).

#### Estructura esperada de API

```
GET    /api/books           - Lista de libros
GET    /api/books/:id       - Detalle de libro
POST   /api/auth/login      - Login de usuario
POST   /api/auth/signup     - Registro de usuario
GET    /api/user/library    - Biblioteca del usuario
POST   /api/user/library    - Agregar libro a biblioteca
DELETE /api/user/library/:id - Quitar libro de biblioteca
```

#### Cliente HTTP (Recomendación)

```bash
npm install axios
```

```javascript
// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### Uso en Componentes

```jsx
import { useState, useEffect } from 'react';
import api from '../utils/api';

function BooksCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  if (loading) return <Loading />;
  
  return (
    <div>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
```

---

## Seguridad

### Best Practices

1. **Nunca commitear secretos**
   - Usar `.env` para credenciales
   - Agregar `.env` a `.gitignore`

2. **Validación de inputs**
   - Sanitizar entrada de usuario
   - Validar en cliente y servidor

3. **Autenticación segura**
   - JWT tokens
   - HTTPS en producción
   - Refresh tokens

4. **Protección XSS**
   - React escapa automáticamente
   - Evitar `dangerouslySetInnerHTML`

5. **Dependencias actualizadas**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Monitoreo y Analytics

### Implementación Futura

#### Google Analytics

```jsx
// src/utils/analytics.js
export const trackPageView = (page) => {
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: page,
  });
};
```

#### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.VITE_APP_ENV,
});
```

---

## Documentación Adicional

### Referencias

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Recursos Internos

- Wiki del proyecto (si existe)
- Diseños en Figma (si existe)
- Documentación de API del backend

---

## Changelog

### Version 1.0.0 - Noviembre 2025
- ✨ Configuración inicial del proyecto
- ✨ Implementación de React 19 + Vite
- ✨ Página de inicio (Homepage)
- ✨ Página de login
- ✨ Sistema de routing básico
- ✨ Componentes reutilizables: Button, InputField, BookCard, etc.
- 📝 Documentación técnica completa
- 📝 Manual de usuario

---

## Contacto y Soporte

### Equipo de Desarrollo
- **Repositorio**: https://github.com/MauricioMontes-UCA/webapp-frontend
- **Issues**: GitHub Issues del repositorio
- **Discusiones**: GitHub Discussions

### Mantenedores
- Verificar en el repositorio los colaboradores actuales

---

## Licencia

[Especificar la licencia del proyecto]

---

**Última actualización**: 16 de Noviembre de 2025  
**Versión del manual**: 1.0  
**Autor**: GitHub Copilot

---

## Apéndices

### A. Comandos Útiles

```bash
# Instalación
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Actualizar dependencias
npm update

# Ver dependencias desactualizadas
npm outdated

# Limpiar cache
npm cache clean --force

# Reinstalar todo
rm -rf node_modules package-lock.json && npm install
```

### B. Shortcuts de VS Code

- `Ctrl + P`: Búsqueda rápida de archivos
- `Ctrl + Shift + F`: Búsqueda global
- `F12`: Ir a definición
- `Alt + Shift + F`: Formatear documento
- `Ctrl + /`: Comentar línea

### C. Git Cheat Sheet

```bash
# Ver estado
git status

# Agregar archivos
git add .

# Commit
git commit -m "mensaje"

# Ver ramas
git branch

# Cambiar rama
git checkout nombre-rama

# Crear y cambiar a nueva rama
git checkout -b nueva-rama

# Pull de cambios
git pull origin develop

# Push de cambios
git push origin nombre-rama

# Ver historial
git log --oneline

# Deshacer cambios locales
git checkout -- archivo
```

---

**Fin del Manual Técnico**
