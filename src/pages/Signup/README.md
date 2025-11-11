---

### Página de Registro (`/signup`)

**Archivos creados/modificados:**

```
src/pages/Signup/Signup.jsx     # Nueva vista de registro
src/pages/Signup/Signup.css     # Estilos del formulario
src/App.jsx                     # Se agregó la ruta /signup
```

**Componentes usados:**

* `InputField` → campos de texto reutilizables
* `Button` → envío del formulario
* `Checkbox` → aceptación de términos
* `colors.css` → paleta global dorada

**Funcionalidad:**

* Validación completa en frontend:
  * Nombre y apellido (solo letras)
  * Correo (formato válido)
  * Contraseña (mínimo 8 caracteres, confirmación)
  * Checkbox obligatorio
* Simulación de registro con mensaje de éxito
* Enlace a `/login` tras registro exitoso

**Notas:**
* Sin conexión backend todavía — pendiente integración con endpoint `POST /api/auth/signup`.
* Estructura y props preparadas para conectar fácilmente al servicio de autenticación.

