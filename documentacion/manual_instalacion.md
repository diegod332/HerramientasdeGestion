# Manual de Instalación y Configuración - Anstagram
**UTCV • Ingeniería en Desarrollo y Gestión de Software (9° IDGS)**
**Materia: Administración de Proyectos de TI**

Este documento detalla los pasos para realizar la instalación, configuración y ejecución de **Anstagram**, tanto en su entorno de Frontend (React) como Backend (Node.js + Express) y la base de datos (MySQL).

---

## 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:
- **Node.js** (Versión v18 o superior recomendada)
- **NPM** (Gestor de paquetes incluido con Node.js)
- **MySQL Server** (Versión 8.0 o superior) o herramientas como XAMPP/WampServer que incluyan MariaDB/MySQL.
- **Git** (Para control de versiones)

---

## 2. Obtención del Código

Clona el repositorio en tu máquina local utilizando Git:
```bash
git clone https://github.com/tu-usuario/anstagram.git
cd anstagram
```

*(Nota: En caso de entrega de comprimidos, descomprimir en un directorio limpio sin carpetas padres adicionales).*

---

## 3. Inicialización de la Base de Datos (MySQL)

1. Abre tu terminal de comandos de MySQL o una herramienta de interfaz gráfica como **phpMyAdmin**, **MySQL Workbench** o **DBeaver**.
2. Ejecuta el script SQL ubicado en `codigo_fuente/database/anstagram_db.sql` para crear la base de datos, estructurar las tablas, relaciones e insertar los datos semilla (seed data).
   - Usando la consola clásica de MySQL:
     ```sql
     source codigo_fuente/database/anstagram_db.sql;
     ```
   - O copia y pega el contenido del script directamente en el editor SQL de tu cliente de base de datos preferido.

---

## 4. Configuración del Servidor Backend (Node.js)

1. Dirígete a la carpeta del backend:
   ```bash
   cd codigo_fuente/backend
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Duplica el archivo `.env.example` y renombralo a `.env`:
   ```bash
   cp .env.example .env
   ```
4. Abre el archivo `.env` y edita las credenciales según tu entorno MySQL local:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql (ej. root)
   DB_PASS=tu_contraseña_mysql
   DB_NAME=anstagram_db
   JWT_SECRET=tu_clave_secreta_jwt
   ```

---

## 5. Configuración del Cliente Frontend (React)

1. Dirígete a la carpeta del frontend:
   ```bash
   cd ../frontend
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

---

## 6. Ejecución de la Aplicación

Para ejecutar ambos servicios en desarrollo:

### Ejecutar Backend:
1. Desde la carpeta `codigo_fuente/backend`:
   ```bash
   npm run dev
   ```
2. El backend levantará en [http://localhost:5000](http://localhost:5000). Verás en la terminal el mensaje indicando si conectó correctamente a MySQL o si activó el modo de simulación segura (Mock).

### Ejecutar Frontend:
1. Desde la carpeta `codigo_fuente/frontend`:
   ```bash
   npm run dev
   ```
2. La terminal mostrará un enlace local (ej. [http://localhost:5173](http://localhost:5173)) al que puedes acceder desde tu navegador favorito para disfrutar de Anstagram.

---

## 7. Credenciales de Prueba (Datos Semilla)

Para iniciar sesión y probar la aplicación rápidamente, puedes usar los siguientes usuarios previamente creados en el script de datos semilla:

| Correo Electrónico | Contraseña | Rol en Proyecto |
| :--- | :--- | :--- |
| `diego@anstagram.com` | `password123` | Diego (Líder / Backend) |
| `alberto@anstagram.com` | `password123` | Alberto (Frontend / UI) |
| `joaquin@anstagram.com` | `password123` | Joaquín (DB / QA) |
