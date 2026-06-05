# Manual de Normas Colaborativas y de Trabajo - Anstagram
**UTCV • Ingeniería en Desarrollo y Gestión de Software (9° IDGS)**
**Materia: Administración de Proyectos de TI**

Este documento detalla las directrices del equipo para asegurar un desarrollo fluido, estandarizado y colaborativo en el repositorio de **Anstagram**.

---

## 1. Convención de Mensajes de Commit

Para mantener un historial de cambios legible y ordenado, el equipo adopta la convención de **Conventional Commits**. Cada commit debe iniciar con uno de los siguientes prefijos en minúscula seguido de dos puntos (`:`):

- **`feat:`** Introducción de una nueva característica o funcionalidad al sistema (ej: `feat: agrega pantalla de login en react`).
- **`fix:`** Resolución de un error o bug detectado (ej: `fix: corrige validación de jwt en express`).
- **`docs:`** Modificaciones o adiciones en los archivos de documentación (ej: `docs: actualiza manual de instalacion`).
- **`refactor:`** Cambios en el código que no alteran la funcionalidad final pero mejoran la estructura o legibilidad (ej: `refactor: optimiza pool de conexiones mysql`).
- **`style:`** Cambios cosméticos que no afectan el comportamiento del código (formato, CSS, etc.).

---

## 2. Reglas y Estrategias para el Uso de Ramas (GitFlow)

El equipo utiliza una estructura simplificada de ramas para asegurar que el código en producción esté libre de fallos:

1. **`main` (Producción):** Contiene el código completamente estable del proyecto. Solo se permite integrar código aquí mediante Pull Requests (PR) desde la rama `develop`.
2. **`develop` (Integración):** Rama principal de desarrollo donde se consolidan todas las características listas para probar.
3. **`feature/*` (Características):** Ramas temporales creadas para desarrollar una funcionalidad específica (ej: `feature/auth-jwt`, `feature/feed-ui`). Se originan a partir de `develop` y vuelven a esta cuando la tarea se completa y se prueba satisfactoriamente.

---

## 3. Proceso de Revisión de Pull Requests (PR)

Antes de integrar cambios a la rama `develop` o `main`:
- **Creación del PR:** El desarrollador a cargo debe abrir un Pull Request describiendo claramente los cambios agregados y referenciando el ID de la tarea asociada.
- **Revisión por Pares (Peer Review):** Todo PR debe ser revisado y aprobado por al menos un integrante del equipo diferente al autor (preferiblemente el líder de proyecto o el encargado de QA).
- **Pruebas de Calidad:** Joaquín Daniel (QA) debe validar localmente la compilación de la rama antes de otorgar su aprobación definitiva para el merge.

---

## 4. Canales y Horarios de Comunicación

Para coordinar de forma efectiva las actividades fuera del horario escolar en la UTCV:
- **Canal Principal:** Grupo de WhatsApp dedicado exclusivamente a coordinaciones rápidas del proyecto.
- **Plataforma de Videollamadas:** Microsoft Teams / Google Meet para reuniones de avance quincenales (fijadas los sábados a las 10:00 AM).
- **Horario de Comunicación Hábil:** Lunes a Viernes de 4:00 PM a 9:00 PM, y Sábados de 9:00 AM a 2:00 PM. Se respeta el tiempo libre fuera de estos intervalos salvo emergencias de entrega del proyecto integrador.

---

## 5. Políticas de Documentación de Código

- **Idioma:** Todo el código fuente, incluyendo nombres de variables, comentarios explicativos, mensajes de commit e interfaces de usuario, debe escribirse en **español**.
- **Comentarios en Funciones:** Cada controlador de backend y componente clave del frontend debe contar con un bloque de comentario superior que describa su propósito, parámetros de entrada y respuesta esperada.
- **Preservación:** No eliminar comentarios explicativos previos sobre dependencias críticas del sistema.
