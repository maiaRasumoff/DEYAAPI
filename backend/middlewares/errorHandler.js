const errorHandler = (err, req, res, next) => {
  console.error('❌ Error no manejado:', err);
  
  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Error de validación',
      errors: err.errors
    });
  }
  
  // Error de base de datos
  if (err.code === '23505') { // Unique constraint violation
    return res.status(409).json({
      message: 'El recurso ya existe',
      error: 'Duplicate entry'
    });
  }
  
  if (err.code === '23503') { // Foreign key constraint violation
    return res.status(400).json({
      message: 'Referencia inválida',
      error: 'Foreign key constraint failed'
    });
  }
  
  // Error por defecto
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
};

module.exports = errorHandler;
