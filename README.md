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



INTEGRACIÓN DE RATING CON BACKEND

INTEGRACIÓN DE RATING CON BACKEND

Dejo aquí cómo funciona y cómo puedes adaptar la integración de ratings en el frontend, explicado en primera persona:

1. Cuando le das click a una carta de libro, esa carta debe tener la ID de Google Books (por ejemplo, "2gOsAgAAQBAJ").
2. Al hacer click, navega a la página de detalle usando una ruta como `/books/:googleId`. Así, la URL será algo como `/books/2gOsAgAAQBAJ`.
3. En la página de descripción (`Description.jsx`), obtengo la ID del libro así:
   ```js
   const { googleId } = useParams();
   ```
   Uso `googleId` en todas las llamadas a la API de ratings y reviews.
4. Los endpoints del backend esperan esa ID para devolver y guardar ratings asociados a cada libro.
5. El usuario puede ver el promedio, la cantidad de ratings y dejar su propia calificación y comentario para cada libro.

Si en algún momento necesitas adaptar esto a otro flujo, aquí te dejo lo que debes cambiar:

- Asegúrate de que la ruta en el router sea `/books/:googleId` y que el componente de detalle (Description.jsx) use `const { googleId } = useParams();`.
- Si tu componente de carta de libro (BookCard) no navega a `/books/:googleId`, actualízalo para que lo haga usando la ID de Google Books.
- En `Description.jsx`, todas las llamadas a la API de ratings y reviews deben usar `googleId`.
- Si cambias el nombre del parámetro en la URL, actualízalo en todos los lugares donde se usa.
- Si quieres mostrar la lista de reseñas de otros usuarios, puedes agregar una llamada a la API de reviews y renderizar la lista en el mismo componente de detalle.

Recomendaciones personales:
- Siempre asegúrate de que el backend esté corriendo y que los endpoints de rating estén disponibles.
- Inicia el frontend con `npm run dev` y navega a la página de detalle del libro para probar.
- Si necesitas mostrar la lista de reseñas de otros usuarios, dímelo y lo agrego.

1. El flujo correcto es que cada vez que le das click a una carta de libro, esa carta debe tener la ID de Google Books (por ejemplo, "2gOsAgAAQBAJ").
2. Al hacer click, navega a la página de detalle usando una ruta como `/books/:googleId`. Así, la URL será algo como `/books/2gOsAgAAQBAJ`.
3. En la página de descripción (`Description.jsx`), obtén la ID del libro así:
   ```js
   const { googleId } = useParams();
   ```
   Usa `googleId` en todas las llamadas a la API de ratings y reviews.
4. Los endpoints del backend esperan esa ID para devolver y guardar ratings asociados a cada libro.
5. El usuario puede ver el promedio, la cantidad de ratings y dejar su propia calificación y comentario para cada libro.




- Asegúrate de que la ruta en el router sea `/books/:googleId` y que el componente de detalle (Description.jsx) use `const { googleId } = useParams();`.
- Si tu componente de carta de libro (BookCard) no navega a `/books/:googleId`, actualízalo para que lo haga usando la ID de Google Books.
- En `Description.jsx`, todas las llamadas a la API de ratings y reviews deben usar `googleId`.
- Si cambias el nombre del parámetro en la URL, asegúrate de actualizarlo en todos los lugares donde se usa.
- Si necesitas mostrar la lista de reseñas de otros usuarios, puedes agregar una llamada a la API de reviews y renderizar la lista en el mismo componente de detalle.

Recomendaciones:
- Asegúrate de que el backend esté corriendo y que los endpoints de rating estén disponibles.
- Inicia el frontend con `npm run dev` y navega a la página de detalle del libro.
- Si necesitas mostrar la lista de reseñas de otros usuarios, avísame y lo agrego.


Reemplaza los valores simulados:**
   - En `src/pages/BooksPage/Description.jsx`, busca:
     ```js
     const bookId = "test-book-1"; // Reemplaza por el ID real del libro
     const userId = 1; // Reemplaza por el ID real del usuario autenticado
     ```
   - Cambia `bookId` por el ID real del libro que quieras probar.
   - Cambia `userId` por el ID real del usuario autenticado (puedes obtenerlo del contexto de autenticación o del backend).

