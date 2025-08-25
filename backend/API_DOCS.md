# API Documentation - DEYA Popup Events

## Base URL
```
http://localhost:3000/api/event
```

## Endpoints

### 1. Listar todos los popups
**GET** `/api/event`

**Respuesta exitosa (200):**
```json
{
  "message": "Popups obtenidos exitosamente",
  "count": 2,
  "data": [
    {
      "idpopup": 1,
      "titulo": "Miu Miu pop-up",
      "descripcion": "Descripción del popup",
      "imagen": "url_imagen"
    }
  ]
}
```

### 2. Obtener detalle básico de un popup
**GET** `/api/event/:id`

**Parámetros:**
- `id` (number): ID del popup

**Respuesta exitosa (200):**
```json
{
  "message": "Popup obtenido exitosamente",
  "data": {
    "idpopup": 1,
    "titulo": "Miu Miu pop-up",
    "descripcion": "Descripción del popup",
    "imagen": "url_imagen"
  }
}
```

### 3. Obtener popup completo con barrio y usuario ⭐ NUEVO
**GET** `/api/event/:id/full`

**Parámetros:**
- `id` (number): ID del popup

**Respuesta exitosa (200):**
```json
{
  "message": "Popup completo obtenido",
  "data": {
    "idpopup": 1,
    "imagen": "url_imagen",
    "nombre": "Miu Miu pop-up",
    "ubicacion": "Av. 9 de julio, 1234",
    "barrio": "Palermo",
    "usuario": {
      "iduser": 2,
      "nombreuser": "Juan Perez",
      "email": "juan@email.com",
      "contrasenia": "hash_password",
      "favoritos": ["item1", "item2"],
      "plan": "premium",
      "idestilo": 1,
      "idbarrio": 1
    }
  }
}
```

### 4. Obtener nombre de barrio por ID ⭐ NUEVO
**GET** `/api/event/barrioId/:id`

**Parámetros:**
- `id` (number): ID del barrio

**Respuesta exitosa (200):**
```json
{
  "nombre": "Palermo"
}
```

**Respuesta de error (404):**
```json
{
  "error": "Barrio no encontrado"
}
```

## Códigos de Error

### 400 - Bad Request
```json
{
  "message": "ID inválido. Debe ser un número.",
  "received": "abc"
}
```

### 404 - Not Found
```json
{
  "message": "Popup con ID 999 no encontrado",
  "id": 999
}
```

### 500 - Internal Server Error
```json
{
  "message": "Error interno del servidor al obtener popup completo"
}
```

## Estructura de Base de Datos

### Tabla: popup
- `idpopup` (PK)
- `imagen`
- `nombre`
- `ubicacion`
- `idusuario` (FK → usuario.iduser)
- `idbarrio` (FK → barrio.idbarrio)

### Tabla: barrio
- `idbarrio` (PK)
- `nombre`

### Tabla: usuario
- `iduser` (PK)
- `nombreuser`
- `email`
- `contrasenia`
- `favoritos`
- `plan`
- `idestilo`
- `idbarrio` (FK → barrio.idbarrio)

## Middlewares Implementados

- **logger**: Registra todas las peticiones HTTP
- **errorHandler**: Maneja errores de manera centralizada
- **validateId**: Valida que el ID sea un número válido
- **validatePagination**: Valida parámetros de paginación

## Ejemplos de Uso con Expo/React Native

### Obtener popup completo
```javascript
const fetchPopupFull = async (popupId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/event/${popupId}/full`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Popup completo:', data.data);
    
    return data.data;
  } catch (error) {
    console.error('Error al obtener popup:', error);
    throw error;
  }
};

// Uso
useEffect(() => {
  const loadPopup = async () => {
    try {
      const popupData = await fetchPopupFull(1);
      setPopup(popupData);
    } catch (error) {
      // Manejar error
    }
  };
  
  loadPopup();
}, []);
```

### Obtener lista de popups
```javascript
const fetchPopups = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/event');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error al obtener popups:', error);
    throw error;
  }
};
```

### Obtener nombre de barrio por ID
```javascript
const fetchBarrioNombre = async (barrioId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/event/barrioId/${barrioId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Barrio no encontrado');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.nombre; // Solo el nombre del barrio
  } catch (error) {
    console.error('Error al obtener barrio:', error);
    throw error;
  }
};

// Uso
const barrioNombre = await fetchBarrioNombre(1);
console.log('Nombre del barrio:', barrioNombre); // "Palermo"
```

## Notas de Implementación

- Se utilizan LEFT JOINs para asegurar que se obtenga el popup incluso si no existe barrio o usuario
- El middleware de validación convierte automáticamente el ID a número
- Se manejan errores específicos de PostgreSQL (constraints, foreign keys)
- La respuesta JSON está estructurada para ser fácil de consumir en aplicaciones móviles
