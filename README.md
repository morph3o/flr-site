# FLR FC Official Website

Sitio web oficial del equipo de fútbol **FLR FC**, diseñado como una experiencia digital moderna para mostrar la historia, el plantel y los logros del club.

## 📋 Descripción

Este proyecto es una **Single Page Application (SPA)** desarrollada con React y Vite que sirve como punto de contacto digital para fans, jugadores y rivales. Destaca por su estética "Dark Mode" premium, animaciones fluidas y una estructura de navegación intuitiva.

## ✨ Características Principales

-   **Diseño Moderno**: Interfaz oscura elegante con acentos en rosa (`#ECB7CB`) y tipografía moderna.
-   **Experiencia Dinámica**: Animaciones suaves al hacer scroll y transiciones interactivas.
-   **Secciones Informativas**:
    -   **Historia**: Orígenes y evolución del club desde 2018.
    -   **Plantel 2026**: Fichas detalladas de los jugadores actuales.
    -   **Palmarés**: Registro de trofeos y logros importantes.
    -   **Galería**: Momentos destacados en imágenes.
    -   **Contacto**: Formulario para agendar partidos amistosos.
-   **Responsive Design**: Totalmente optimizado para dispositivos móviles y de escritorio.

## 🛠 Stack Tecnológico

-   **[React 18](https://react.dev/)**: Biblioteca principal para la construcción de interfaces.
-   **[Vite](https://vitejs.dev/)**: Build tool de última generación para un desarrollo rápido.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para el diseño (uso de valores arbitrarios para personalización precisa).
-   **[Lucide React](https://lucide.dev/)**: Colección de iconos ligeros y consistentes.
-   **[GitHub Pages](https://pages.github.com/)**: Platforma de hosting estático.

## 🚀 Instalación y Uso

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

### Prerrequisitos
-   Node.js (versión LTS recomendada)
-   npm o yarn

### Pasos

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/morph3o/flr-site.git
    cd flr-site
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    El sitio estará disponible en `http://localhost:5173`.

4.  **Compilar para producción**:
    ```bash
    npm run build
    ```

## 📦 Estructura del Proyecto

```text
flr-site/
├── src/
│   ├── app.jsx       # Lógica principal (Componentes, Datos, Rutas)
│   ├── index.jsx     # Punto de entrada de React
│   └── index.css     # Estilos globales
├── width/            # Configuración estática
├── package.json      # Dependencias y scripts
└── vite.config.js    # Configuración de Vite
```

## 🔧 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Construye la aplicación optimizada para producción.
-   `npm run preview`: Previsualiza localmente la versión de producción.
-   `npm run deploy`: Despliega el contenido de la carpeta `build` a GitHub Pages.

## 📄 Licencia

Este proyecto es para uso privado de FLR FC.
