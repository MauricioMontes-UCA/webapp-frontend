# webapp-frontend
Este repositorio contiene el Front-End para el proyecto de Programación Web: "El Último Párrafo".

MI BIBLIOTECA - NUEVA FUNCIONALIDAD

Página para organizar libros personales en tres categorías:
- Leyendo
- Leer  
- Terminado

CÓMO USAR

1. Instalar dependencias
   npm install

2. Iniciar servidor
   npm run dev

3. Acceder a Mi Biblioteca:
   - Menú principal: clic en "Mi Biblioteca"
   - Menú de usuario: seleccionar "Mi Biblioteca"
   - URL directa: http://localhost:5173/my-library

CONEXIÓN CON BACKEND

La página hace peticiones a estos endpoints:

GET /api/library/stats/:userId
Retorna: { reading: 5, toRead: 12, completed: 30 }

GET /api/library/:userId/reading
GET /api/library/:userId/toRead
GET /api/library/:userId/completed
Retorna: Array de libros

Formato de cada libro:
{
  id: "123",
  title: "Nombre del libro",
  author: "Autor",
  cover: "https://url-imagen.jpg",
  pages: 350,
  progress: 45
}

CONFIGURACIÓN

Backend debe estar en: http://localhost:5000

Para cambiar URL del backend, crear archivo .env:
VITE_API_URL=http://tu-servidor:puerto/api

