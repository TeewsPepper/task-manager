
#  Todo App Fullstack

##  Tecnologías usadas

- **Frontend:** React + Vite + TypeScript + CSS Modules
- **Backend:** Node.js + Express + TypeScript + PostgreSQL
- **Base de datos:** PostgreSQL (Docker)
- **ORM:** Sin ORM, uso directo de consultas con `pg`
- **Otros:** dotenv, CORS, Axios

---

##  Estructura del proyecto

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── app.ts              # Archivo principal del backend
│   │   ├── db.ts               # Conexión a PostgreSQL
│   │   ├── routes/
│   │   │   └── tasks.ts        # Rutas relacionadas a tareas
│   │   ├── controllers/
│   │   │   └── tasks.ts        # Lógica de cada endpoint
│   │   └── types/
│   │       └── task.ts         # Tipado de Tarea
│   └── .env                    # Variables de entorno (conexión DB)
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Enrutador principal
│   │   ├── pages/
│   │   │   └── TaskList.tsx    # Página principal con tareas
│   │   ├── services/
│   │   │   └── tasks.ts        # Funciones para conectar al backend
│   │   ├── types/
│   │   │   └── task.ts         # Tipado compartido de tareas
│   │   └── styles/
│   │       └── TaskList.module.css # Estilos mobile-first + paleta personalizada
│   └── vite.config.ts
```

---

##  Variables de entorno `.env`

### En `backend/.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=tu_contraseña
FRONTEND_URL=http://localhost:5173
```

---

##  Cómo ejecutar

###  1. Base de datos (PostgreSQL)

Podés correrla con Docker:

```bash
docker run --name todo-postgres -e POSTGRES_PASSWORD=tu_contraseña -p 5432:5432 -d postgres
```

Creá la base y tabla:

```sql
CREATE DATABASE taskdb;

\c taskdb

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo'
);
```

---

### 2. Backend

```bash
cd backend
npm install
npx ts-node src/app.ts
```

El backend corre en: [http://localhost:3000](http://localhost:3000)

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

La app está en: [http://localhost:5173](http://localhost:5173)

---

##  Funcionalidades

- Ver lista de tareas
- Crear nueva tarea
- Editar título en línea
- Cambiar estado (`todo`, `in-progress`, `done`)
- Eliminar tarea
- Diseño adaptado a mobile (responsive)
- Estilos visuales claros según estado

---

##  Extras

- `TaskList.tsx` está preparado con buen control de estado local
- El backend es modular (controllers, routes)
- Las tareas se ordenan por `id`

---

##  Capturas (opcional)

Agregá capturas de pantalla si querés mostrar el estilo visual.
