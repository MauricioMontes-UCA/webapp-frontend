<<<<<<< HEAD
Página de Configuración (Settings)

La aplicación incluye una página de ajustes donde el usuario puede personalizar su experiencia.
Todas las preferencias se guardan en localStorage bajo la clave userSettings.

Opciones Disponibles
Preferencias de Visualización

Tamaño de fuente
Opciones: small (14px), medium (16px), large (18px)
Se aplica a toda la aplicación.
Vista compacta
Activa/desactiva un diseño con menos espacios.

Animaciones

Permite habilitar o deshabilitar animaciones de la interfaz.

Preferencias de Uso

Guardado automático

Guarda el progreso de lectura sin intervención del usuario.

Estructura guardada en localStorage
{
  "fontSize": "medium",
  "autoSave": true,
  "compactView": false,
  "animations": true
}

Detalles Técnicos

Ruta: /settings

Acceso: Desde el Header → Menú de usuario → Configuración

Persistencia: Uso de localStorage

Estilos: Utiliza la paleta definida en src/styles/colors.css

Archivos relacionados
src/pages/Settings/Settings.jsx
src/pages/Settings/Settings.css
src/components/Header/Header.jsx
src/App.jsx
=======
webapp-frontend

Página de Perfil de Usuario

Ubicación
- Ruta: /profile
- Archivos:
  - src/pages/UserProfile/UserProfile.jsx
  - src/pages/UserProfile/UserProfile.css
  - src/pages/UserProfile/index.js

Cambios Realizados

1. Eliminación del campo Nombre Completo
- Removí el campo fullName del estado del usuario
- Eliminé el input de Nombre completo del formulario de edición
- Quité la visualización del nombre completo en la vista de solo lectura
- Ahora solo se muestra: nombre de usuario, correo electrónico y biografía

2. Modal de Eliminación de Cuenta Mejorado
- Reemplacé el alert por un modal personalizado de éxito
- Diseño con colores verdes y ícono de verificación
- Mensaje: Tu cuenta ha sido eliminada exitosamente
- Redirección automática a la página principal (/) después de 3 segundos
- Se agregó useNavigate de react-router-dom para la navegación

3. Ajustes de Diseño
- Los botones del modal ahora usan justify-content: space-between
- El botón Cancelar aparece más a la derecha
- Modal de éxito con estilos en verde (modal-success)

Componentes Importados
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

Estados Principales
const [userData, setUserData] = useState({
  username: 'usuario_ejemplo',
  email: 'usuario@example.com',
  bio: 'Amante de la lectura y la literatura clásica.'
});
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);

Integración en App.jsx
import UserProfile from './pages/UserProfile'
<Route path="/profile" element={<UserProfile />} />

Estilos CSS Agregados
- .modal-success - Estilos para el modal de éxito
- .success-message - Contenedor del mensaje con ícono
- Colores verdes para indicar éxito (#4caf50, #2e7d32)

---

Página de Catálogo de Libros

Ubicación
- Ruta: /main
- Archivos:
  - src/pages/MainPage/MainPage.jsx
  - src/pages/MainPage/MainPage.css
  - src/pages/MainPage/index.js

Funcionalidades

1. Integración con Google Books API
- Búsqueda de libros por categoría
- Obtención automática de información (título, autor, imagen, descripción)
- Manejo de libros sin portada disponible

2. Categorías de Libros
- Fiction, Science, History, Technology
- Business, Self-Help, Fantasy, Biography

3. Sección de Nuevos Lanzamientos
- Carousel con libros recientes
- Navegación por flechas
- Responsive

4. Grid de Libros
- Tarjetas con información de cada libro
- Imagen de portada, título y autor
- Botón para ver detalles (próximamente)

5. Header de Navegación
- Logo y nombre del sitio
- Links a: Inicio, Catálogo, Mi Biblioteca, Búsqueda Avanzada
- Menú de usuario con dropdown
- Opciones: Mi Perfil, Mi Biblioteca, Configuración, Cerrar Sesión
- Modal de confirmación para cerrar sesión
- Menú hamburguesa para mobile

Configuración de API

Crear archivo .env en la raíz del proyecto:
VITE_GOOGLE_BOOKS_API_KEY=tu_api_key_aqui

El archivo .env ya está en .gitignore para no subir la API key a GitHub.

Componentes Utilizados
- Button (src/components/Button)
- Header (src/components/Header)

Integración en App.jsx
import MainPage from './pages/MainPage'
<Route path="/main" element={<MainPage />} />

Estilos
- Paleta de colores dorados del proyecto
- Responsive (Desktop, Tablet, Mobile)
- Grid adaptable según tamaño de pantalla
- Animaciones y transiciones

Notas
- La búsqueda avanzada está deshabilitada (será implementada por otro miembro del equipo)
- Las funcionalidades de detalle de libro serán agregadas con el backend
- El carousel usa scroll horizontal nativo
>>>>>>> develop
