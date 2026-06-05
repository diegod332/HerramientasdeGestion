# Anstagram 📸
**Proyecto Integrador - Administración de Proyectos de TI (9° IDGS)**
**Universidad Tecnológica del Centro de Veracruz (UTCV)**

Anstagram es un clon funcional y responsivo de Instagram con un sistema de diseño premium adaptado. Desarrollado de forma modular e integral como evidencia académica práctica.

---

## 👥 Integrantes del Equipo

- **Diego Sanchez Sanchez** (Líder de Proyecto / Backend Developer)
- **Alberto Valerio Romero** (Frontend Developer / Diseñador UI/UX)
- **Joaquin Daniel Garcia Cobos** (Database Administrator / Especialista QA)

---

## 🏫 Información Académica

- **Institución:** Universidad Tecnológica del Centro de Veracruz (UTCV)
- **Carrera:** Ingeniería en Desarrollo y Gestión de Software (IDGS)
- **Materia:** Administración de Proyectos de TI
- **Grado y Grupo:** 9° "A" IDGS
- **Cuatrimestre:** Noveno

---

## 🛠️ Tecnologías Utilizadas

### Frontend:
- **React.js** (Biblioteca para interfaces de usuario SPA)
- **Vite** (Herramienta de compilación rápida)
- **React Router Dom** (Sistema de enrutamiento del lado del cliente)
- **Axios** (Peticiones HTTP al servidor)
- **Lucide React** (Paquete de iconos limpios y modernos)
- **CSS3 Puro** (Diseño responsivo y personalizado con Glassmorphism)

### Backend:
- **Node.js** & **Express.js** (Servidor HTTP y ruteo de la API REST)
- **JSON Web Tokens (JWT)** (Autenticación y seguridad de rutas)
- **bcryptjs** (Algoritmo hash para cifrado de contraseñas)
- **Multer** (Carga y procesamiento de imágenes en el servidor)
- **CORS** (Intercambio de recursos de origen cruzado)

### Base de Datos:
- **MySQL** (Motor de base de datos relacional)
- **mysql2** (Driver de conexión y consultas promisificadas)

---

## 📁 Estructura del Repositorio

El repositorio está estructurado en tres únicas carpetas raíz tal como se requiere:
- **`codigo_fuente/`**
  - `frontend/` (Cliente React)
  - `backend/` (Servidor Express)
  - `database/` (Script SQL de base de datos relacional)
- **`documentacion/`**
  - `manual_instalacion.md` (Paso a paso de despliegue)
  - `TRL_tecnologias.md` (Reporte de nivel TRL)
  - `roles_responsabilidades.md` (Asignación de roles y matriz RACI)
  - `normas_colaborativas.md` (Reglas de Git y comunicación)
- **`recursos/`**
  - `diagrama_flujo.png` (Referencia del diagrama)
  - `paleta_colores.md` (Identidad de marca y códigos HEX)
  - `wireframes.md` (Mockups del diseño)

---

## 🚀 Instrucciones Rápidas de Instalación

1. **Base de Datos:**
   Importa el script `codigo_fuente/database/anstagram_db.sql` en tu servidor de MySQL local.

2. **Servidor Backend:**
   ```bash
   cd codigo_fuente/backend
   npm install
   cp .env.example .env
   # Configura tus credenciales MySQL en .env
   npm start
   ```

3. **Cliente Frontend:**
   ```bash
   cd codigo_fuente/frontend
   npm install
   npm run dev
   ```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.
