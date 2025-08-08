const db = require('../db/db');

async function listEvents(req, res) {
  try {
    console.log('📋 Listando todos los popups...');
    
    const { rows } = await db.query(
      'SELECT idpopup, titulo, descripcion, imagen FROM popup ORDER BY idpopup ASC'
    );

    console.log(`✅ Encontrados ${rows.length} popups`);

    if (rows.length === 0) {
      return res.status(404).json({ 
        message: 'No se encontraron popups',
        data: []
      });
    }

    return res.status(200).json({
      message: 'Popups obtenidos exitosamente',
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error al listar popups:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor al obtener popups',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function getEventDetail(req, res) {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID de popup inválido. Debe ser un número.' 
      });
    }

    console.log(`🔍 Buscando popup con ID: ${id}`);
    
    const { rows } = await db.query(
      'SELECT idpopup, titulo, descripcion, imagen FROM popup WHERE idpopup = $1',
      [id]
    );

    if (rows.length === 0) {
      console.log(`❌ Popup con ID ${id} no encontrado`);
      return res.status(404).json({ 
        message: `Popup con ID ${id} no encontrado`,
        id: parseInt(id)
      });
    }

    console.log(`✅ Popup con ID ${id} encontrado`);
    return res.status(200).json({
      message: 'Popup obtenido exitosamente',
      data: rows[0]
    });
  } catch (error) {
    console.error('❌ Error al obtener detalle del popup:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor al obtener popup',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = {
  listEvents,
  getEventDetail,
}; 