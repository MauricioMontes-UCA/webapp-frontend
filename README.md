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
