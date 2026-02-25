# Guía de Trabajo y Estándares del Repositorio

## Organización del código

El repositorio se divide en dos carpetas. Cada equipo debe limitar su trabajo a su módulo correspondiente para no afectar el progreso de los demás.

### Backend Python
Todo lo relacionado con el servidor se encuentra en /backend.
* **/core**: Configuración global, base de datos y utilidades compartidas.
* **/inscripciones**: Lógica de aspirantes, carga de documentos y selección.
* **/academico**: Gestión de mallas curriculares, docentes y calificaciones.
* **/tesis**: Seguimiento de protocolos de investigación y tutores.

### Frontend React
Todo lo relacionado con la interfaz de usuario se encuentra en /frontend/src.
* **/components**: Elementos comunes como botones, barras de navegación y modales.
* **/inscripciones**: Pantallas y formularios del proceso de admisión.
* **/academico**: Dashboards de notas, materias y horarios.
* **/tesis**: Gestión de archivos y seguimiento de grados.

Los directorios y carpetas, en los que sera organizado, esta por ser definidos, sin embargo
la estructura anterior sirve como plantilla, un punto de partida.
Así mismo el nombre de los directorios esta por ser definido.

---

## Reglas de Escritura (Nomenclatura)

Es obligatorio seguir estas reglas para que el código sea uniforme y legible para todos:

* **Variables y Funciones**: Usar camelCase. Los nombres deben ser descriptivos y en inglés.
    * Ejemplo: isUserAuthenticated, calculateTotalGrade.
* **Nombre de Archivos**: Todo en minúsculas y separado por guiones.
    * Ejemplo: report-controller.py, user-profile.jsx.
* **Constantes**: Valores que no cambian en el tiempo van en mayúsculas sostenidas.
    * Ejemplo: MAX_FILE_SIZE, DEFAULT_SEMESTER.

---

## Uso de Git y Flujo de Trabajo

### Mensajes de Commit
No se aceptarán mensajes genéricos. Deben seguir el formato: tipo(modulo): descripción corta.

* **feat**: Cuando agregas una funcionalidad nueva.
* **fix**: Cuando corriges un error en el código.
* **docs**: Cambios en manuales o comentarios.

Ejemplo: feat(tesis): agregar validación de formato PDF
Ejemplo: fix(inscripciones): corregir error en la fecha de registro

En tipos de commits, solo se mencionan algunos cuantos. Utiliza el tipo de commit que necesites.

### Gestión de Ramas
La rama main es solo para código terminado y probado. El desarrollo diario se hace en develop.
Cada tarea debe tener su propia rama saliendo de develop con el formato: feature/modulo/nombre-tarea.

Ejemplo: feature/academico/historial-notas

De nuevo las ramas de git, nombres y demas estan por ser definidas.

---

## Revisión y Pull Requests

Antes de que tus cambios se unan a la rama principal:

1. **Revisión**: Al menos un integrante de tu equipo y uno de otro equipo deben revisar tu código para asegurar que todo funcione bien.
2. **Limpieza**: Antes de enviar tu código, borra cualquier print, console.log o código comentado que no sea necesario.
3. **Sincronización**: Asegúrate de actualizar tu rama con los cambios más recientes de develop antes de finalizar el proceso de integración.

Habra un revisor de codigo por cada equipo, seran los responsables de revisar y aprobar el codigo realizado por los demas miembros del equipo.
