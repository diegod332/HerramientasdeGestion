# Matriz de Roles y Responsabilidades (RACI) - Anstagram
**UTCV • Ingeniería en Desarrollo y Gestión de Software (9° IDGS)**
**Materia: Administración de Proyectos de TI**

Para garantizar el éxito y la entrega oportuna del proyecto **Anstagram**, el equipo ha delimitado los roles y responsabilidades de cada integrante. Esta estructura promueve la especialización y la eficiencia en el flujo de trabajo colaborativo.

---

## 1. Organización del Equipo de Proyecto

| Integrante | Rol Principal | Enfoque de Desarrollo |
| :--- | :--- | :--- |
| **Diego Sanchez Sanchez** | **Líder de Proyecto / Backend** | API REST, Seguridad JWT, Configuración de Servidores, Rutas, Integraciones. |
| **Alberto Valerio Romero** | **Frontend Developer / UI** | Interfaz de Usuario React, Responsive Design, Ruteo SPA, Estilos CSS Premium, UX de Stories/Likes/Comments. |
| **Joaquin Daniel Garcia Cobos** | **Database Administrator / QA** | Modelado Relacional SQL, Optimización de Consultas, Índices, Pruebas de Software, Aseguramiento de Calidad. |

---

## 2. Responsabilidades Específicas por Rol

### Diego Sanchez Sanchez — Líder de Proyecto / Backend
- **Gestión General:** Coordinar las entregas del equipo, planificar reuniones, monitorear el cumplimiento del cronograma académico y validar la integración del código en la rama principal.
- **Arquitectura Backend:** Diseñar y estructurar la API REST con Node.js y Express.
- **Seguridad:** Implementar el cifrado de contraseñas de usuarios con `bcryptjs` y la protección de endpoints mediante JSON Web Tokens (JWT).
- **Subida de Archivos:** Configurar y validar el almacenamiento de fotos de publicaciones e historias utilizando `Multer`.

### Alberto Valerio Romero — Frontend / UI
- **Diseño del Sistema (CSS):** Crear y documentar el sistema de diseño visual de **Anstagram** (colores, tipografías, gradientes, sombras, etc.).
- **Desarrollo en React:** Desarrollar los componentes dinámicos como Navbar, Feed, Stories, Modal de Creación y Vistas de Perfil.
- **Consumo de APIs:** Integrar la librería `axios` para conectar el frontend React con los endpoints de la API del backend.
- **Diseño Responsivo:** Garantizar que la interfaz sea adaptable en múltiples dispositivos (móvil, tablet y escritorio).

### Joaquin Daniel Garcia Cobos — Base de datos / QA
- **Diseño de Base de Datos:** Crear la estructura relacional de la base de datos MySQL con llaves foráneas para evitar inconsistencias.
- **Optimización SQL:** Crear índices estratégicos en tablas de búsquedas frecuentes (como publicaciones, seguidores y likes) para garantizar respuestas veloces.
- **Control de Calidad (QA):** Diseñar y ejecutar casos de prueba manuales y automatizados para verificar el flujo de registro, login, publicaciones y comentarios.
- **Validación Final:** Inspeccionar que el código final compile libre de errores de sintaxis y bugs críticos en consola.

---

## 3. Matriz RACI del Proyecto

La matriz RACI define quién es **R**esponsable (Responsible), **A**probador (Accountable), **C**onsultado (Consulted) e **I**nformado (Informed) para cada actividad clave del proyecto:

| Actividad del Proyecto | Diego Sanchez | Alberto Valerio | Joaquin Garcia |
| :--- | :---: | :---: | :---: |
| Diseño de Base de Datos | **C** | **I** | **A** / **R** |
| Configuración de API REST y Servidor | **A** / **R** | **C** | **I** |
| Implementación de Autenticación JWT | **A** / **R** | **I** | **C** |
| Construcción de Componentes React UI | **C** | **A** / **R** | **I** |
| Integración de Axios y Rutas | **C** | **A** / **R** | **I** |
| Pruebas Unitarias e Integración (QA) | **R** | **R** | **A** / **R** |
| Documentación Técnica y Manuales | **A** / **R** | **R** | **R** |
