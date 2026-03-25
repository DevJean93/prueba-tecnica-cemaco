# 🛒 Prueba Técnica: Senior Backend Developer - CEMACO

Esta es una solución Full Stack desarrollada como prueba técnica para la posición de Senior Backend Developer. La aplicación simula la experiencia de compra (e-commerce) y la gestión de inventario de Cemaco, haciendo énfasis en la **consistencia de datos, comunicación en tiempo real y despliegue agnóstico**.


## 🚀 Arquitectura y Tecnologías

El proyecto está diseñado con una arquitectura desacoplada y contenerizada, lista para ser desplegada en cualquier entorno (Local, Portainer, etc.).

### Backend
* **Framework:** .NET 8 (C#) - ASP.NET Core Web API
* **Base de Datos:** SQL Server 2022
* **ORM:** Entity Framework Core (Code-First)
* **Tiempo Real:** SignalR (WebSockets) para notificaciones de inventario
* **Autenticación:** JWT (JSON Web Tokens)

### Frontend
* **Framework:** React 18 (Vite)
* **Estilos:** Tailwind CSS
* **Manejo de Estado Global:** Zustand
* **Peticiones HTTP:** Axios (con interceptores dinámicos)

### Infraestructura
* **Contenedores:** Docker y Docker Compose

---

## 🌟 Características Principales 

1. **Sincronización de Inventario en Tiempo Real:** Implementación de WebSockets (SignalR). Cuando un usuario realiza una compra o un administrador actualiza el stock, el cambio se refleja instantáneamente en la pantalla de todos los clientes conectados, sin necesidad de recargar la página.
2. **Transacciones Seguras:** El proceso de *checkout* utiliza transacciones en la base de datos para garantizar la integridad del inventario ante escenarios de alta concurrencia.
3. **Despliegue Agnóstico (Environment-Ready):** 
   * El Frontend detecta dinámicamente el `hostname` para conectarse a la API y a los WebSockets, sin URLs quemadas.
   * El Backend maneja políticas de **CORS seguras y dinámicas** a través de variables de entorno (`AllowedOrigins`).
4. **Estado Global Optimizado:** Uso de Zustand en el frontend para manejar el carrito de compras y los filtros de búsqueda sin prop-drilling, manteniendo un rendimiento fluido.

---

## ⚙️ Instrucciones de Ejecución

Todo el ecosistema está orquestado con Docker. No es necesario instalar SDKs de .NET, Node.js ni SQL Server en la máquina host.

### Prerrequisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) o Docker Engine instalado.
* Docker Compose.
* *(Opcional)* Portainer para desplegar por medio de Stack.

### Pasos para levantar el proyecto

1. Clona este repositorio y levanta los contenedores:
   ```bash
   git clone [https://github.com/DevJean93/prueba-tecnica-cemaco.git](https://github.com/DevJean93/prueba-tecnica-cemaco.git)
   cd prueba-tecnica-cemaco
   docker-compose up --build -d
   ```
*(La base de datos ejecutará sus migraciones e insertará los datos semilla automáticamente).*

---

## 🌐 Accesos y URLs

Una vez que los contenedores estén corriendo, puedes acceder a los siguientes servicios:

* **Frontend (Vista Pública):** http://localhost:5173 
* **Frontend (Panel Administrativo):** http://localhost:5173/login 
* **Backend API (Swagger):** http://localhost:8080/swagger/index.html

### 🗄️ Credenciales de Base de Datos
* **Server:** `localhost,1434`
* **User:** `sa`
* **Password:** `CemacoTest@26`

---

## 🔑 Credenciales de Prueba (Data Seeding)

La base de datos se inicializa automáticamente con usuarios y productos de prueba.

### 👨‍💼 Usuario Administrador
*(Este usuario tiene acceso al panel de gestión de inventario)*
* **Email:** `admin@cemaco.com`
* **Password:** `Admin123!`

### 👤 Usuario Cliente
*(Opcional para pruebas)*
* **Email:** `cliente@cemaco.com`
* **Password:** `Cliente123!`