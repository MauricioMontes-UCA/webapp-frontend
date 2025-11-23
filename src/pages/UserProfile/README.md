Esta es una página completa para gestionar el perfil de usuario en El Último Párrafo. Permite ver y editar la información personal, cambiar la contraseña, configurar preferencias y manejar opciones sensibles como la eliminación de la cuenta.

Incluye una sección para mostrar los datos del usuario (nombre, usuario, email, biografía y un avatar con la inicial). Se puede activar el modo edición para modificar todo, con validaciones básicas, como que el email tenga un formato correcto o que el nombre de usuario tenga mínimo 3 caracteres. El diseño diferencia claramente cuando se está viendo la info y cuando se está editando.

También tiene una parte de seguridad donde se puede abrir un modal para cambiar la contraseña. Ahí se pide la contraseña actual, una nueva de mínimo 8 caracteres y la confirmación. En el futuro se podrá activar autenticación en dos pasos y opciones más avanzadas de privacidad.

En la parte de preferencias hay switches para activar o desactivar notificaciones por email y decidir si el perfil es público. Hay espacio preparado para añadir el modo oscuro más adelante.

La zona de peligro incluye la opción de eliminar la cuenta, con un modal que explica qué datos se perderán y pide confirmación clara para evitar errores.

Para construir la página se usan componentes reutilizables como Inputs, Botones, Header y Footer, además de algunos personalizados como el toggle switch, el avatar circular y el sistema de modales. El diseño sigue la paleta dorada del proyecto e incluye animaciones suaves, hover effects y un estilo responsive que se adapta a desktop, tablet y móvil.

Toda la lógica funciona con estados locales: datos del usuario, si está en modo edición, si están abiertos los modales, los datos del formulario, los de la contraseña y los errores de validación.

Por ahora todo está simulado sin backend: guardar perfil, cambiar contraseña y eliminar cuenta solo muestran mensajes para probar. Más adelante se conectará a la API para obtener, actualizar o eliminar información real.
