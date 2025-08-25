Holis! A continuación podrás ver un resumen de lo que se estuvo haciendo en esta demo repecto a la API creada para el manejo de rutas, optimizacion de las mismas y escalabilidad.
Luego de la finalizacion del código me tomé el tiempo de pasarlo por IA para poder explicar a nuevos usuarios mediante este README de manera detallada el funcionamiento de la app, cómo ejecutarla, la estructura esperable y como probarla con postman. 
Espero pueda ser de utilidad! Saludos!

# DEYA API - Popups desde Supabase

API REST en Node.js con Express para obtener información de popups desde una base de datos PostgreSQL alojada en Supabase.

## 🚀 Características

- ✅ Conexión segura a Supabase PostgreSQL
- ✅ Endpoints públicos sin autenticación
- ✅ Manejo de errores robusto
- ✅ Logging detallado
- ✅ CORS configurado para desarrollo
- ✅ Health check endpoint

## 📁 Estructura del Proyecto

```
backend/
├── controllers/
│   └── eventController.js    # Lógica de negocio para popups
├── db/
│   └── db.js                # Conexión a PostgreSQL
├── routes/
│   └── eventRouter.js       # Definición de rutas
└── server.js                # Servidor Express
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd DEYAAPI
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar el archivo de ejemplo
   copy .env.example .env
   ```
   
   Editar `.env` y agregar tu URL de conexión de Supabase:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   ```

## 📋 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponibles

#### 1. Listar todos los popups
```http
GET /api/event
```

**Respuesta exitosa (200):**
```json
{
  "message": "Popups obtenidos exitosamente",
  "count": 2,
  "data": [
    {
      "idpopup": 1,
      "titulo": "Popup de Bienvenida",
      "descripcion": "Bienvenido a nuestra aplicación",
      "imagen": "welcome.jpg"
    },
    {
      "idpopup": 2,
      "titulo": "Oferta Especial",
      "descripcion": "¡Aprovecha esta oferta!",
      "imagen": "offer.jpg"
    }
  ]
}
```

#### 2. Obtener popup por ID
```http
GET /api/event/:id
```

**Ejemplo:**
```http
GET /api/event/1
```

**Respuesta exitosa (200):**
```json
{
  "message": "Popup obtenido exitosamente",
  "data": {
    "idpopup": 1,
    "titulo": "Popup de Bienvenida",
    "descripcion": "Bienvenido a nuestra aplicación",
    "imagen": "welcome.jpg"
  }
}
```

#### 3. Health Check
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.456
}
```

## ⚠️ Códigos de Error

### 400 - Bad Request
```json
{
  "message": "ID de popup inválido. Debe ser un número."
}
```

### 404 - Not Found
```json
{
  "message": "No se encontraron popups",
  "data": []
}
```

```json
{
  "message": "Popup con ID 999 no encontrado",
  "id": 999
}
```

### 500 - Internal Server Error
```json
{
  "message": "Error interno del servidor al obtener popups"
}
```

## 🗄️ Base de Datos

### Tabla: `popup`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idpopup` | INTEGER | ID único del popup (Primary Key) |
| `titulo` | VARCHAR | Título del popup |
| `descripcion` | TEXT | Descripción del popup |
| `imagen` | VARCHAR | URL o nombre del archivo de imagen |

## 🧪 Pruebas con Postman

### 1. Listar todos los popups
```
GET http://localhost:3000/api/event
```

### 2. Obtener popup específico
```
GET http://localhost:3000/api/event/1
```

### 3. Probar con ID inexistente
```
GET http://localhost:3000/api/event/999
```

### 4. Health check
```
GET http://localhost:3000/health
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno
- `DATABASE_URL`: URL de conexión a Supabase PostgreSQL
- `PORT`: Puerto del servidor (opcional, default: 3000)
- `NODE_ENV`: Entorno de ejecución (development/production)

### Logs
El servidor incluye logging detallado:
- ✅ Conexiones exitosas a la base de datos
- 📋 Consultas realizadas
- ❌ Errores y excepciones
- 🌐 Requests HTTP

## 🚀 Comandos Disponibles

```bash
npm start          # Iniciar servidor
npm install        # Instalar dependencias
```

## 📝 Notas Importantes

- La API está configurada para desarrollo con CORS abierto
- Las consultas SQL usan parámetros seguros para prevenir SQL injection
- SSL está habilitado para Supabase
- El pool de conexiones está optimizado para mejor rendimiento

## 🔗 URLs Útiles

- **Servidor**: http://localhost:3000
- **API**: http://localhost:3000/api/event
- **Health**: http://localhost:3000/health 
