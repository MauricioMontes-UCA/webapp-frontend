# Página de Perfil de Usuario

## Descripción
Página completa de gestión de perfil de usuario para "El Último Párrafo". Permite a los usuarios gestionar su información personal, configurar preferencias de seguridad y privacidad, y administrar su cuenta.

## Características Implementadas

### 1. Información Personal
- **Vista de Perfil**: Muestra nombre de usuario, email, nombre completo y biografía
- **Modo Edición**: Permite editar todos los campos del perfil
- **Avatar con Inicial**: Muestra la primera letra del nombre de usuario
- **Validación de Formulario**: Valida campos obligatorios y formato de email
- **Estados Visuales**: Indicadores claros de modo lectura vs modo edición

### 2. Seguridad y Privacidad
- **Cambio de Contraseña**: Modal dedicado con validación
  - Requiere contraseña actual
  - Validación de mínimo 8 caracteres
  - Confirmación de nueva contraseña
- **Autenticación de Dos Factores**: Preparado para implementación futura
- **Privacidad del Perfil**: Opciones de privacidad (próximamente)

### 3. Preferencias
- **Notificaciones por Email**: Toggle switch interactivo
- **Perfil Público**: Control de visibilidad del perfil
- **Tema Oscuro**: Preparado para implementación futura

### 4. Zona de Peligro
- **Eliminación de Cuenta**: 
  - Modal de confirmación con advertencias claras
  - Lista detallada de datos que serán eliminados
  - Diseño visual que enfatiza la gravedad de la acción

## Componentes Utilizados

### Componentes Reutilizables
- `InputField`: Para todos los campos de entrada
- `Button`: Con variantes (primary, outline, danger)
- `Header`: Navegación principal
- `Footer`: Pie de página

### Componentes Personalizados
- **Toggle Switch**: Switch personalizado para preferencias
- **Avatar Circle**: Círculo con inicial del usuario
- **Modal System**: Sistema de modales reutilizable

## Diseño UI/UX

### Paleta de Colores
- Mantiene consistencia con el sistema de colores del proyecto
- Utiliza la paleta dorada característica de "El Último Párrafo"
- Zona de peligro con colores de error apropiados

### Interactividad
- **Hover Effects**: En tarjetas, botones y elementos interactivos
- **Animaciones Suaves**: 
  - Fade in para modales
  - Slide up para contenido de modales
  - Transform effects en elementos hover
- **Feedback Visual**: Estados claros para todas las acciones

### Responsive Design
- **Desktop**: Layout amplio con tarjetas organizadas
- **Tablet** (max-width: 768px): Ajustes en disposición de elementos
- **Mobile** (max-width: 480px): Layout vertical optimizado

## Estructura de Archivos

```
src/pages/UserProfile/
├── UserProfile.jsx       # Componente principal
├── UserProfile.css       # Estilos completos
└── index.js             # Export por defecto
```

## Rutas

La página está accesible en:
- `/profile` - Página de perfil de usuario

## Funcionalidades Simuladas (Sin Backend)

Todas las funciones están preparadas con console.logs y alerts para simular interacción:

1. **Guardar Perfil**: Muestra alerta de éxito
2. **Cambiar Contraseña**: Simula cambio exitoso
3. **Eliminar Cuenta**: Simula eliminación con advertencia
4. **Toggle Switches**: Funcionan con estado local

## Estados del Componente

```javascript
- userData: Datos del usuario actual
- editMode: Modo de edición activo/inactivo
- showDeleteModal: Controla visibilidad del modal de eliminación
- showPasswordModal: Controla visibilidad del modal de contraseña
- formData: Datos del formulario en edición
- passwordData: Datos del cambio de contraseña
- errors: Errores de validación
```

## Próximas Mejoras (Requieren Backend)

1. **Integración con API**:
   - GET `/api/user/profile` - Obtener datos del usuario
   - PUT `/api/user/profile` - Actualizar perfil
   - POST `/api/user/change-password` - Cambiar contraseña
   - DELETE `/api/user/account` - Eliminar cuenta

2. **Subida de Avatar**:
   - Permitir cargar imagen de perfil
   - Recorte y ajuste de imagen

3. **Autenticación de Dos Factores**:
   - Configuración de 2FA
   - Códigos de recuperación

4. **Tema Oscuro**:
   - Implementar switch de tema
   - Persistir preferencia

5. **Historial de Actividad**:
   - Registro de cambios de cuenta
   - Dispositivos activos

## Validaciones Implementadas

### Perfil
- ✅ Nombre de usuario mínimo 3 caracteres
- ✅ Email requerido y formato válido
- ✅ Campos obligatorios marcados

### Contraseña
- ✅ Contraseña actual requerida
- ✅ Nueva contraseña mínimo 8 caracteres
- ✅ Confirmación debe coincidir

## Accesibilidad

- Labels descriptivos en todos los inputs
- Contraste de colores adecuado
- Elementos interactivos con estados hover/focus
- Mensajes de error claros y específicos
- Botones con textos descriptivos

## Testing Manual

Para probar la página:

1. Navegar a `/profile`
2. Hacer clic en "Editar" en Información Personal
3. Modificar campos y guardar
4. Probar "Cambiar Contraseña" con diferentes escenarios
5. Activar/desactivar toggles de preferencias
6. Intentar eliminar cuenta y cancelar

## Notas Técnicas

- Todos los cambios son locales hasta integrar con backend
- Los modales se cierran al hacer clic fuera de ellos
- La validación es en tiempo real al editar
- Estados de error se limpian automáticamente al corregir
