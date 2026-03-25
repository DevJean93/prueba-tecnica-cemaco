# Prueba Tecnica - Cemaco

Plataforma Full Stack para la gestión centralizada del catálogo de productos e inventario, desarrollada como prueba técnica para la posición de Senior Backend Developer.

## 🚀 Tecnologías Utilizadas

**Backend:**
* .NET 8 (C#) - Web API RESTful
* Entity Framework Core
* SQL Server (Dockerizado)
* SignalR (WebSockets para reactividad en tiempo real)
* JWT (JSON Web Tokens) para Autenticación y Autorización

**Frontend:**
* React 18 (Vite)
* Tailwind CSS para diseño UI/UX responsivo
* Zustand (Manejo de estado global con persistencia encriptada vía AES)
* React Router DOM (Navegación y protección de rutas)
* Axios (Cliente HTTP con interceptores)

## ✨ Características Principales

* **Arquitectura Desacoplada:** Separación clara entre la vista pública de la tienda y el portal administrativo.
* **Tiempo Real:** Actualización instantánea del catálogo público mediante WebSockets (SignalR) cuando hay cambios en el inventario desde el panel de administración.
* **Seguridad:**
  * Rutas protegidas en el Frontend y endpoints asegurados en el Backend.
  * Almacenamiento local (localStorage) encriptado con CryptoJS para evitar manipulación de tokens y roles.
  * Sincronización de sesión multi-pestaña (cierre de sesión automático en todas las ventanas).
* **Roles y Permisos:**
  * **Administrador:** Acceso total al CRUD de productos (Crear, Leer, Actualizar, Eliminar).
  * **Colaborador:** Acceso restringido (Crear, Leer, Actualizar). No puede eliminar productos.
* **UX/UI Avanzada:** Dashboard de métricas, buscador en tiempo real por Nombre o SKU, diseño responsivo y feedback visual para operaciones CRUD y estados de conexión.

## 🛠️ Requisitos Previos

Tener instalado lo siguiente entorno local:
* [Docker Desktop](https://www.docker.com/products/docker-desktop)

## ⚙️ Instrucciones de Ejecución

