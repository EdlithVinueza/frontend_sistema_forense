# pw_vue_p9_g4

Sistema de gestión de aeropuerto construido con Vue.js 3 y Quarkus.

## 🎨 Sistema de Diseño

Este proyecto incluye un **sistema de estilos globales** inspirado en redes sociales modernas (Facebook, etc.) con diseño responsive.

- **Archivo principal:** `src/assets/global-styles.css`
- **Guía completa:** Ver [GUIA_ESTILOS_GLOBALES.md](GUIA_ESTILOS_GLOBALES.md)
- **Mensajes visuales:** Ver [GUIA_MENSAJES.md](GUIA_MENSAJES.md)

### Características del diseño:
✅ Diseño moderno estilo redes sociales
✅ Totalmente responsive (Desktop, Tablet, Mobile)
✅ Sistema de componentes reutilizables (botones, cards, tablas, formularios)
✅ Variables CSS para consistencia
✅ Mensajes visuales en lugar de alerts
✅ Preparado para Dark Mode

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

## 📁 Estructura del proyecto

```
src/
├── assets/
│   ├── global-styles.css    # 🎨 Estilos globales (¡NUEVO!)
│   └── mensajes.css          # Mensajes visuales
├── clients/                  # HTTP clients para APIs
│   ├── AvionClient.js
│   ├── PasajeroClient.js
│   └── VueloClient.js
├── components/              # Componentes Vue
│   ├── aviones/
│   ├── pasajeros/
│   └── vuelos/
├── router/                  # Vue Router + Auth guards
├── views/                   # Vistas principales
└── main.js                  # Punto de entrada
```

## 🔐 Autenticación

El proyecto usa JWT (RS256) con MicroProfile JWT:
- Token almacenado en `localStorage`
- Guards de autenticación en rutas
- Redirección automática a `/login` si no autenticado

## 🚀 APIs Backend

- **Aviones:** `http://localhost:8081/aeropuerto/api/v1.0/aviones`
- **Pasajeros:** `http://localhost:8081/aeropuerto/api/v1.0/pasajeros`
- **Vuelos:** `http://localhost:8081/aeropuerto/api/v1.0/vuelos`
- **Auth:** `http://localhost:8082/auth`

## 📚 Documentación adicional

- [GUIA_ESTILOS_GLOBALES.md](GUIA_ESTILOS_GLOBALES.md) - Sistema de diseño completo
- [GUIA_MENSAJES.md](GUIA_MENSAJES.md) - Cómo usar mensajes visuales

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
