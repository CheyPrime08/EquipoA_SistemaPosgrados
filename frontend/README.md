<div align="center">
  <img src="https://i.programmerhumor.io/2021/12/programmerhumor-io-frontend-memes-javascript-memes-b2938ac565c90f9.jpg" width="300px">
</div>

---

# 📂 Estructura y Arquitectura del Proyecto (Frontend)

```text
├── 📁 src
│   ├── 📁 api            # Servicios y configuración de peticiones HTTP (Axios/Fetch)
│   ├── 📁 assets         # Recursos estáticos (docs, icons, images, logos) organizados por rol
│   ├── 📁 components     # Componentes de React reutilizables
│   │   ├── 📁 common     # Componentes compartidos (Header, Sidebar, Tooltips)
│   │   ├── 📁 layout     # Estructuras de página (Dashboard layouts)
│   │   ├── 📁 ui         # Átomos de interfaz (shadcn/ui: buttons, inputs, dialogs)
│   │   └── 📄 plantilla.jsx
│   ├── 📁 constants      # Valores estáticos, configuraciones y textos fijos por módulo
│   ├── 📁 context        # Estados globales de la aplicación (Auth, UI State)
│   ├── 📁 hooks          # Custom hooks (animaciones, detección de móvil, etc.)
│   ├── 📁 lib            # Utilidades y funciones de ayuda (utils.js)
│   ├── 📁 modules        # Lógica de negocio y componentes específicos por funcionalidad
│   │   ├── 📁 admin      # Gestión de administrador
│   │   ├── 📁 alumnado   # Procesos relativos al alumno
│   │   ├── 📁 coordinacion # Gestión completa (agenda, alumnos, aspirantes, tesis)
│   │   ├── 📁 login      # Lógica de autenticación
│   │   └── 📁 preregistro # Flujo de registro inicial
│   ├── 📁 pages          # Vistas principales vinculadas a las rutas (Admin, Alumno, Coord)
│   ├── 📁 routes         # Definición de rutas, navegación y archivos de rutas por rol
│   ├── 📁 styles         # Estilos específicos y animaciones CSS por módulo
│   ├── 📄 App.jsx        # Componente raíz y orquestador de rutas
│   ├── 🎨 index.css      # Estilos globales y Tailwind base
│   └── 📄 main.jsx       # Punto de entrada de la aplicación
├── ⚙️ components.json    # Configuración de shadcn/ui
├── 📄 eslint.config.js   # Reglas de linter para calidad de código
├── 🌐 index.html         # Plantilla HTML principal
├── ⚙️ jsconfig.json      # Configuración de alias de rutas (Path mapping)
├── ⚙️ package.json       # Dependencias y scripts del proyecto
└── 📄 vite.config.js     # Configuración del empaquetador Vite
```

## 🛑 Reglas de Arquitectura: Lo que SÍ debo y lo que NO debo...

> **Buenas prácticas:** Debemos mantener un código limpio y escalable si es necesario. Hay que tener cultura general, como buenos ingenieros en computación que somos.
>
> ⚠️ **ATENCIÓN:** Si un archivo está en la carpeta equivocada durante un Code Review, el Pull Request **será rechazado**.

| 📂 Directorio (Propósito)                      | ✅ SÍ Hacer                                                                                                                                                | ❌ NO Hacer                                                                                                                                                      |
| :--------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`api/`**<br>_(El Mensajero)_                 | Configuraciones de Axios/Fetch, endpoints separados por recurso (ej. `alumnos.api.js`, `auth.api.js`).                                                     | No debe haber **nada** de React aquí (ni `.jsx`, ni hooks, ni estados). Solo JavaScript puro que devuelve promesas.                                              |
| **`components/`**<br>_(Las piezas de LEGO)_    | Componentes "tontos" y reutilizables que solo reciben `props` y muestran una UI (ej. `Button.jsx`, `Modal.jsx`, `Navbar.jsx`).                             | **PROHIBIDO** hacer peticiones a la API o manejar lógica pesada aquí. Si el componente necesita saber qué es un "Alumno", probablemente pertenezca a `modules/`. |
| **`constants/`**<br>_(Las reglas de piedra)_   | Valores que nunca cambian y se usan en toda la app (ej. `ROLES = { ADMIN: 'admin' }`, mensajes de error, números límite).                                  | **NO:** No guardes variables que cambian con el tiempo (estados) ni funciones lógicas aquí.                                                                      |
| **`modules/`**<br>_(Motores o piezas grandes)_ | Componentes inteligentes y específicos de una funcionalidad (ej. `FormularioPreRegistro.jsx`). Aquí sí puedes importar servicios de la API y usar Context. | No pongas componentes de diseño genérico aquí.                                                                                                                   |
| **`pages/`**<br>_(El ensamblaje)_              | Archivos que representan una ruta de la URL (ej. `/admin/dashboard`). Las páginas deben ser "delgadas", limitándose a importar partes para armar la vista. | **PROHIBIDO** escribir cientos de líneas de diseño visual (HTML/CSS) o lógica compleja directamente. Para eso está la carpeta de módulos.                        |
| **`routes/`**<br>_(El Mapa y el Cadenero)_     | Configuración de las URLs del proyecto usando React Router. Define qué componente de `pages/` se muestra en cada link y protege las rutas privadas.        | **NO:** **PROHIBIDO** crear componentes visuales o HTML/CSS aquí. Las rutas solo importan de `pages/` y dirigen el tráfico.                                      |
| **`hooks/`**<br>_(Lógica de React)_            | Funciones personalizadas que usan los hooks de React (`useState`, `useEffect`) para compartir lógica entre componentes.                                    | No guardes funciones de Javascript puro que no usen React (ej. un formateador de fechas). Eso va en `lib/`.                                                      |
| **`lib/`**<br>_(Caja de herramientas)_         | Configuraciones de librerías externas (ej. inicializar Firebase o Axios) y funciones puras de JavaScript (ej. `formatDate.js`).                            | No debe haber archivos `.jsx` ni componentes visuales aquí.                                                                                                      |
| **`assets/`**<br>_(Recursos estáticos)_        | Logos de la institución, iconos en SVG, imágenes de fondo estáticas _(Recomendación: Usen subcarpetas según su módulo ej. `Alumnados`)_.                   | No guardes imágenes de prueba gigantes.                                                                                                                          |
| **`context/`**<br>_(Estado Global)_            | Estados que TODA la aplicación necesita conocer (ej. `AuthContext` para saber quién está logueado, `ThemeContext`).                                        | No uses el Context para datos locales que solo le importan a una vista. Para eso usa `useState` normal en tu componente.                                         |
| **`styles/`**<br>_(Decoración)_                | Archivos CSS globales, variables de color, tipografías y configuraciones base del diseño en sus respectivos carpetas de modulo (ej. ``variables.css`).     | **NO:** **PROHIBIDO** meter aquí los estilos específicos de un solo componente (ej. `Boton.css`). Los estilos individuales van junto a su componente.            |

---

## 🏷️ Convenciones de Nomenclatura (Naming Conventions)

> **Para que este proyecto no sea Teletubbies:**
> Para que el proyecto parezca escrito por una sola persona y no por 15 distintas, es **obligatorio** seguir estas reglas para nombrar archivos y variables:

| Tipo de Archivo / Elemento                     | 📝 Regla a seguir                                      | ✅ SÍ (Ejemplo Correcto)                                                | ❌ NO (Ejemplo Incorrecto)                                        |
| :--------------------------------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------- |
| ⚛️ **Componentes, Módulos y Páginas** (`.jsx`) | **PascalCase**                                         | `BotonPrimario.jsx`<br>`FormularioRegistro.jsx`<br>`DashboardAdmin.jsx` | `boton.jsx`<br>`formulario_registro.jsx`<br>`Dashboard-admin.jsx` |
| 🪝 **Hooks** (`.js` o `.jsx`)                  | **camelCase** _(siempre empezar con la palabra `use`)_ | `useEstudiantes.js`<br>`useAuth.js`                                     | `HookEstudiantes.js`<br>`authHook.js`                             |
| ⚙️ **Utilidades, API y Lib** (`.js`)           | **camelCase**                                          | `calcularPromedio.js`<br>`alumnos.api.js`                               | `CalcularPromedio.js`<br>`AlumnosApi.js`                          |

---

## 🗿 Manejo de Estilos

(Nota para el equipo: Define aquí cómo trabajarán el CSS para que no haya un desastre visual).

- 💠 **Opción A (Tailwind)**: Todo el diseño debe hacerse mediante clases de Tailwind CSS en los archivos .jsx. ⚠️ El archivo index.css solo se tocará para variables globales o configuraciones base.
- 📦 **Opción B (CSS Modules)**: Si un componente necesita estilos personalizados muy específicos, crear un archivo al lado llamado NombreComponente.module.css dentro de la carpeta style/Elmodulo/ej.css.

---

## ✅ Check-list antes de hacer un Pull Request

Antes de pedir que tu código sea integrado a `develop`, asegúrate de cumplir con lo siguiente:

1. [ ] **Código limpio:** Quitaste todos los console.log(), código comentado y variables que declaraste pero nunca usaste.

2. [ ] **Arquitectura:** Revisaste que tus archivos estén en la carpeta correcta según las reglas de arriba.
