# Reporte de Nivel de Madurez Tecnológica (TRL) - Anstagram
**UTCV • Ingeniería en Desarrollo y Gestión de Software (9° IDGS)**
**Materia: Administración de Proyectos de TI**

Este documento presenta la justificación de las tecnologías seleccionadas para el desarrollo de **Anstagram**, evaluadas bajo la escala **TRL (Technology Readiness Level)** desarrollada originalmente por la NASA y adaptada a la industria del software.

---

## 1. Tabla de Madurez Tecnológica (TRL)

| Tecnología / Herramienta | Nivel TRL | Justificación del Nivel | Rol en el Proyecto |
| :--- | :---: | :--- | :--- |
| **React** (v18+) | **TRL 9** | Probado en entornos operativos reales a escala global por millones de usuarios. Respaldado por Meta. | Biblioteca principal para el desarrollo de la interfaz de usuario reactiva (Frontend SPA). |
| **Node.js** (v18+) | **TRL 9** | Entorno de ejecución de JS en servidor estable, utilizado masivamente en entornos de producción empresarial. | Motor de procesamiento para las peticiones de red y operaciones de backend. |
| **Express.js** | **TRL 9** | Framework estándar e histórico para Node.js, utilizado extensamente en producción. | Estructura para el enrutamiento de la API REST, middlewares de seguridad e interacciones HTTP. |
| **MySQL** | **TRL 9** | Gestor de base de datos relacional de nivel empresarial con soporte constante y rendimiento maduro. | Almacenamiento seguro, consistente y relacional de perfiles, publicaciones, interacciones y stories. |
| **JWT** (JSON Web Tokens) | **TRL 9** | Estándar de la industria (RFC 7519) totalmente maduro y adoptado globalmente para autenticación. | Generación y validación de tokens de sesión para el control de acceso en endpoints protegidos. |
| **Multer** | **TRL 9** | Middleware estándar en Express para el manejo de `multipart/form-data` y procesamiento de archivos. | Recepción y procesamiento local de imágenes para publicaciones y fotos de perfil de usuario. |

---

## 2. Justificación Técnica de la Selección de Tecnologías

### React (Frontend)
React nos permite crear interfaces declarativas y basadas en componentes reutilizables. Esto acelera el proceso de desarrollo y facilita la mantenibilidad del código. Su ecosistema de librerías complementarias (como Axios y Lucide React) provee todas las herramientas necesarias para construir una SPA (Single Page Application) fluida y premium sin sobrecargar el frontend.

### Node.js + Express (Backend)
JavaScript en todo el stack permite al equipo compartir lógica y trabajar con una sintaxis unificada. Node.js destaca por su modelo de E/S asíncrono y no bloqueante guiado por eventos, ideal para aplicaciones intensivas en datos como una red social que gestiona múltiples peticiones concurrentes de likes, comentarios y feeds.

### MySQL (Base de Datos)
Para Anstagram, la integridad relacional es crítica (por ejemplo, asegurar que los comentarios pertenezcan a publicaciones y usuarios existentes). MySQL ofrece un soporte sólido para llaves foráneas, índices de búsqueda rápida y transacciones ACID que aseguran la consistencia de los datos del proyecto.

---

## 3. Comparativa de Alternativas Tecnológicas

A continuación, se detalla un cuadro comparativo donde se contrastan las tecnologías elegidas con otras alternativas del mercado de desarrollo web:

### Frontend: React vs. Vue.js
- **React (Elegido):** Ecosistema masivo, mayor empleabilidad para los egresados de la UTCV y mayor disponibilidad de librerías comunitarias listas para usar. Su flujo de datos unidireccional y componentes funcionales facilitan el desarrollo ágil de la interfaz.
- **Vue.js:** Curva de aprendizaje más suave, pero con menor demanda en el mercado laboral regional y menos herramientas avanzadas integradas por defecto en comparación con el ecosistema corporativo de React.

### Base de Datos: MySQL vs. PostgreSQL
- **MySQL (Elegido):** Mayor simplicidad de instalación y administración (integrado por defecto en stacks populares como XAMPP). Excelente rendimiento en operaciones de lectura intensa, ideal para el feed de Anstagram.
- **PostgreSQL:** Ofrece soporte más avanzado para tipos de datos complejos y consultas analíticas pesadas, pero su configuración inicial y consumo de recursos es ligeramente mayor, lo que excede las necesidades de este proyecto integrador escolar.
