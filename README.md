===== Consultorio Dental — Frontend =====
Interfaz web para el sistema de gestión de un consultorio dental. Permite administrar pacientes, agendar citas y consultar historiales clínicos, conectándose al backend mediante una API REST.
 
==== Tecnologías  ====

React 19 — biblioteca principal de UI
React Router DOM v7 — navegación y rutas
Axios — consumo de la API REST
React Hook Form — manejo y validación de formularios
Tailwind CSS v4 — estilos y diseño responsive
Vite — entorno de desarrollo y bundler


==== Funcionalidades ====

 Gestión de pacientes — registro, consulta, actualización y eliminación
 Citas y agenda — programación y control de citas
 Historial clínico — consulta del historial médico por paciente
 Autenticación — login con manejo de sesión mediante cookies


==== Estructura del proyecto ====
CD-Frontend/
├── public/
│   └── icon/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── services/
├── index.html
├── vite.config.js
└── package.json

==== Instalación y uso ====
bash# Clona el repositorio
git clone https://github.com/AlanCovarrubias999/CD-Frontend.git

# Entra al directorio
cd CD-Frontend

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

Asegúrate de tener el backend corriendo antes de usar la aplicación.
Consulta el repositorio: CD-Backend


==== Repositorio relacionado ====
Este proyecto depende del backend complementario:
CD-Backend :

==== Autor ====
Alan Covarrubias
GitHub : 