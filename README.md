# Guía de arranque (Frontend y Backend)

Este proyecto tiene un frontend en Vite/React y un backend en Spring Boot. Abajo tenés los pasos concretos para levantar ambos servicios en tu máquina.

## Requisitos
- Node.js 18+ y `npm`
- Java 17+
- Maven 3.8+
- Git (opcional, si vas a clonar)

## Puertos y rutas
- Backend: `http://localhost:5000/` (API bajo `http://localhost:5000/api`)
- Frontend: `http://localhost:5173/` (Vite Dev Server)

## 1) Levantar el Backend (Spring Boot)
1. Abrí una terminal en la carpeta del backend:
   - `cd backend`
2. Instalá/compilá las dependencias (opcional si solo corrés):
   - `mvn clean install -DskipTests`
3. Ejecutá la aplicación:
   - `mvn -q -DskipTests spring-boot:run`
4. Verificá que esté arriba en `http://localhost:5000/`.

### Notas de backend
- La API expone endpoints bajo `/api` (por ejemplo, `GET /api/anuncios`, `GET /api/propiedades`, `GET /api/duenos`, `GET /api/direcciones`).
- CORS: los controladores usan `@CrossOrigin(origins = "*")` para permitir llamadas desde el frontend en desarrollo.
- Base de datos: se usa SQLite en `backend/data/inmobiliaria.db`. Se crea/actualiza automáticamente al arrancar. Hay un seeder que carga datos de ejemplo.
- Puerto: configurado en `backend/src/main/resources/application.properties` con `server.port=5000`.

## 2) Levantar el Frontend (Vite/React)
1. Abrí otra terminal en la carpeta del frontend:
   - `cd frontend`
2. Instalá dependencias:
   - `npm install`
3. Ejecutá el servidor de desarrollo:
   - `npm run dev`
4. Abrí el navegador en `http://localhost:5173/`.

### Notas de frontend
- El cliente HTTP (`axios`) está configurado en `frontend/src/api/apiClient.js` con `baseURL: "http://localhost:5000/api"`. Si cambiás el puerto del backend, actualizá ese archivo.
- Ruteo: `react-router-dom` maneja las rutas: `/`, `/anuncios`, `/propiedades`, `/duenos`, `/direcciones`.
- UI: se usa una mezcla de estilos CSS propios y algunos componentes de MUI (por ejemplo diálogos). En desarrollo, el NavBar muestra el enlace activo con subrayado.

## Flujo sugerido de arranque (paso a paso)
1. Backend:
   - `cd backend`
   - `mvn -q -DskipTests spring-boot:run`
2. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
3. Navegá a `http://localhost:5173/` y probá las vistas. El frontend llama a la API del backend en `http://localhost:5000/api`.

## Comandos útiles
- Backend (test/build):
  - `mvn test`
  - `mvn clean install`
- Frontend (lint/build):
  - `npm run build`
  - `npm run preview` (sirve el build localmente)

## Troubleshooting
- Puerto ocupado 5173: Vite puede elegir otro puerto (ej. 5174). Revisá la consola y abrí el que indique.
- El frontend no conecta al backend:
  - Confirmá que el backend esté corriendo en `http://localhost:5000/`.
  - Revisá `frontend/src/api/apiClient.js` y que `baseURL` apunte al puerto correcto.
- Error de Java/Maven:
  - Verificá versión de Java (`java -version`) y Maven (`mvn -v`). Deben ser compatibles (Java 17+).
- Error de dependencias en frontend:
  - Borrá `node_modules` y volvé a instalar: `rm -rf node_modules` (Linux/Mac) o `rmdir /s /q node_modules` (Windows), luego `npm install`.

## Arquitectura rápida
- Frontend: Vite + React + react-router-dom + axios; estilos en `src/styles`.
- Backend: Spring Boot; controladores REST bajo `/api/*`; persiste en SQLite; seeder de datos a la inicialización.
