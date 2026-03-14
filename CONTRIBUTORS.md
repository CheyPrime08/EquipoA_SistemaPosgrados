# Guía de Trabajo y Estándares del Repositorio

## Organización del código

El repositorio se divide en dos carpetas. Cada equipo debe limitar su trabajo a su módulo correspondiente para no afectar el progreso de los demás.

### Backend Python

Todo lo relacionado con el servidor se encuentra en **/backend**.

- **/db**: Archivos de conexión, modelos de base de datos y esquemas.

### Frontend React

El entorno se basa en Vite. Todo lo relacionado con la interfaz de usuario se encuentra en **/frontend/src**:

- **/components**: Elementos reutilizables correspondientes a cada modulo.
- **/pages**: Vistas completas y pantallas principales organizadas por módulo.
- /assets: Imagenes correspondientes a cada modulo.

Los directorios y carpetas, se iran redefiniendo conforme el proyecto vaya avanzando.

---

## Reglas de Escritura (Nomenclatura)

Es obligatorio seguir estas reglas para que el código sea uniforme y legible para todos:

- **Directorios (Carpetas)**: Todos los nombres de carpetas deben ir en **minúsculas** (lowercase). Esto evita errores de ruta en servidores Linux y mantiene la consistencia del proyecto.
  - Ejemplo: `/frontend`, `/backend`, `/components`, `/inscripciones`.
- **Variables y Funciones**: Usar **camelCase**. Los nombres deben ser descriptivos y en inglés.
  - Ejemplo: `isUserAuthenticated`, `calculateTotalGrade`.
- **Nombre de Archivos**: Todo en minúsculas y separado por guiones.
  - Ejemplo: `report-controller.py`, `user-profile.js`.
- **Nombre de Componentes (React)**: Uso obligatorio de **PascalCase** tanto en el nombre del archivo `.jsx` como en la función del componente.
  - Ejemplo: `Navbar.jsx`, `AgendaTable.jsx`, `InscripcionesForm.jsx`.
- **Constantes**: Valores que no cambian en el tiempo van en mayúsculas sostenidas.
  - Ejemplo: `MAX_FILE_SIZE`, `DEFAULT_SEMESTER

---

## Uso de Git y Flujo de Trabajo

### Mensajes de Commit

No se aceptarán mensajes genéricos. Deben seguir el formato: tipo(modulo): descripción corta.

- **feat**: Cuando agregas una funcionalidad nueva.
- **fix**: Cuando corriges un error en el código.
- **docs**: Cambios en manuales o comentarios.

Ejemplo: feat(tesis): agregar validación de formato PDF
Ejemplo: fix(inscripciones): corregir error en la fecha de registro

En tipos de commits, solo se mencionan algunos cuantos. Utiliza el tipo de commit que necesites.

### Gestión de Ramas

La rama **main** es solo para código terminado y probado. El desarrollo diario se hace en **develop**.

Para mantener el orden, se sugiere un esquema jerárquico por funcionalidad, permitiendo flexibilidad de organización a los líderes de cada equipo:

- **Ramas de Módulo (Base)**: Ramas principales de cada equipo que nacen de `develop`.
  - Ejemplo: `Modulo3_Coordinacion`
- **Ramas de Tarea (Sub-ramas)**: Ramas individuales para funcionalidades específicas que nacen de la rama del módulo.

La intencion es que los integrantes de los equipos trabajen de manera individual, en sus propias subramas, integrando sus cambios a su rama base correspondiente a su modulo.

Una vez cada equipo tenga un MVP la intencion es integrar lo correspondiente de las ramas bases, a la rama develop, para su revision y aprovacion posterior a la integracion al main.

---

## Revisión y Pull Requests

Antes de que tus cambios se unan a la rama principal:

1. **Revisión**: Al menos un integrante de tu equipo y uno de otro equipo deben revisar tu código para asegurar que todo funcione bien.
2. **Limpieza**: Antes de enviar tu código, borra cualquier print, console.log o código comentado que no sea necesario.
3. **Sincronización**: Asegúrate de actualizar tu rama con los cambios más recientes de develop antes de finalizar el proceso de integración.

Habra un revisor de codigo por cada equipo, seran los responsables de revisar y aprobar el codigo realizado por los demas miembros del equipo.
