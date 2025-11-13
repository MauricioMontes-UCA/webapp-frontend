# webapp-frontend
Este repositorio contiene el Front-End para el proyecto de Programación Web: "El Último Párrafo".

## Configuración - Página de Settings

Descripción:
Página de configuración que permite personalizar la experiencia mediante preferencias guardadas en localStorage.

Funcionalidades Implementadas:

Preferencias de Visualización:
1. Tamaño de Fuente - Pequeño (14px), Mediano (16px), Grande (18px)
   - Afecta a toda la aplicación
   - Se aplica inmediatamente
   
2. Vista Compacta - Toggle para reducir espacios y mostrar más contenido

3. Animaciones - Toggle para activar/desactivar animaciones de interfaz

Preferencias de Uso:
4. Guardado Automático - Toggle para guardar progreso de lectura automáticamente

Características Técnicas:
- Persistencia: Todas las preferencias se guardan en localStorage con la clave userSettings
- Ruta: /settings
- Acceso: Desde el Header, Menú usuario, Configuración
- Colores: Usa el sistema centralizado (src/styles/colors.css)

Estructura de Datos guardados:
  fontSize: medium (small, medium, large)
  autoSave: true (boolean)
  compactView: false (boolean)
  animations: true (boolean)

Archivos Relacionados:
- src/pages/Settings/Settings.jsx - Componente principal
- src/pages/Settings/Settings.css - Estilos
- src/components/Header/Header.jsx - Links actualizados
- src/App.jsx - Ruta configurada

