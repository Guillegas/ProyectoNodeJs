# API Gestión de Libros y Autores

Proyecto Backend en Node.js para la gestión de una biblioteca.

## 🚀 Guía Rápida para el Profesor

Siga estos pasos exactos para corregir el proyecto.

### 1. Inicialización

Abra la terminal en la carpeta del proyecto y ejecute:

```bash
npm install
```

### 2. Configuración de Base de Datos (MySQL)

El proyecto está configurado para usar los siguientes credenciales por defecto. Puede crear este usuario en su MySQL o ajustar el archivo `src/config/config.js` si prefiere usar `root`.

**Credenciales por defecto:**

- **Base de datos:** `literatura`
- **Usuario:** `proyecto_guille`
- **Contraseña:** `proyecto_guille`
- **Host:** `localhost`

#### Opción A: Crear Usuario y Base de Datos (Recomendado)

Ejecute el siguiente script SQL en su workbench o cliente MySQL para dejar todo listo:

```sql
CREATE DATABASE IF NOT EXISTS literatura;
CREATE USER IF NOT EXISTS 'proyecto_guille'@'localhost' IDENTIFIED BY 'proyecto_guille';
GRANT ALL PRIVILEGES ON literatura.* TO 'proyecto_guille'@'localhost';
FLUSH PRIVILEGES;
```

#### Opción B: Usar sus propias credenciales

Si prefiere no crear un usuario nuevo, edite el archivo `src/config/config.js` y ponga su usuario (ej. `root`) y su contraseña.

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

El servidor iniciará en **http://localhost:3000**

---

## 🧪 Cómo Probar los Endpoints (Muy Fácil)

No es necesario usar Postman. He incluido archivos de prueba directa en el proyecto.

1.  Vaya a la carpeta `src/request`.
2.  Abra el archivo `author_api.rest` o `book_api.rest`.
3.  Verá un pequeño texto que dice **"Send Request"** encima de cada URL.
4.  Pulse ahí para ejecutar la prueba y ver la respuesta a la derecha.

**Ejemplos incluidos:**

- Listar todos
- Buscar por ID
- Crear (POST)
- Modificar (PUT)
- Borrar (DELETE)
