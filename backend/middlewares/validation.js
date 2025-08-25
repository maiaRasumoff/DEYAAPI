const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      message: 'ID inválido. Debe ser un número.',
      received: id
    });
  }
  
  // Convertir a número y asignar a req.params
  req.params.id = parseInt(id);
  next();
};

const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  
  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({
      message: 'Página inválida. Debe ser un número mayor a 0.',
      received: page
    });
  }
  
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return res.status(400).json({
      message: 'Límite inválido. Debe ser un número entre 1 y 100.',
      received: limit
    });
  }
  
  req.query.page = pageNum;
  req.query.limit = limitNum;
  next();
};

module.exports = {
  validateId,
  validatePagination
};
