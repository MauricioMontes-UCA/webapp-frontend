webapp-frontend

Este repositorio contiene el Front-End para el proyecto de Programación Web: "El Último Párrafo".

Página de Perfil de Usuario

Ubicación
- Ruta: /profile
- Archivos:
  - src/pages/UserProfile/UserProfile.jsx
  - src/pages/UserProfile/UserProfile.css
  - src/pages/UserProfile/index.js

Funcionalidades:

1. Información Personal Editable
- Nombre de usuario (mínimo 3 caracteres)
- Nombre completo
- Correo electrónico (con validación)
- Biografía
- Avatar con inicial del usuario
- Modo edición con validación en tiempo real

2. Seguridad y Privacidad
- Cambio de contraseña con validación (mínimo 8 caracteres)
- Modal para cambiar contraseña

3. Preferencias
- Toggle switches para:
  - Notificaciones por email
  - Perfil público/privado
  - Tema oscuro (próximamente)

4. Gestión de Cuenta
- Eliminación de cuenta
- Modal de confirmación con advertencias

Componentes Utilizados:
- InputField (src/components/InputField)
- Button con variantes: primary, outline, danger (src/components/Button)

Diseño:
- Paleta de colores dorados del proyecto
- Responsive (Desktop, Tablet, Mobile)
- Animaciones y transiciones suaves
- Sistema de modales

Integración:
Agregar en App.jsx:
import UserProfile from './pages/UserProfile'
<Route path="/profile" element={<UserProfile />} />

Nota: Las funcionalidades están simuladas sin backend. Usar console.log() y alert() para feedback.

