const db = require('../db/db');

// LISTAR TODOS LOS POPUPS
async function listEvents(req, res) {
  try {
    console.log('📋 Listando todos los popups...');
    
    const { rows } = await db.query(
      'SELECT idpopup, nombre, imagen, ubicacion, idusuario, idbarrio FROM popup ORDER BY idpopup ASC'
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

// OBTENER POPUP POR ID (solo datos de popup)
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
      'SELECT idpopup, nombre, imagen, ubicacion, idusuario, idbarrio FROM popup WHERE idpopup = $1',
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

// OBTENER POPUP CON BARRIO Y USUARIO
async function getEventFullDetail(req, res) {
  try {
    const { id } = req.params;
    
    console.log(`🔍 Buscando popup completo con ID: ${id}`);
    
    // Query con JOINs para obtener popup, barrio y usuario
    const query = `
      SELECT 
        p.idpopup,
        p.imagen,
        p.nombre,
        p.ubicacion,
        p.idusuario,
        p.idbarrio,
        b.nombrebarrio,
        u.iduser,
        u.nombreuser,
        u.email,
        u.contrasenia,
        u.favoritos,
        u.plan,
        u.idestilo,
        u.idbarrio as usuario_idbarrio
      FROM popup p
      LEFT JOIN barrio b ON p.idbarrio = b.idbarrio
      LEFT JOIN usuario u ON p.idusuario = u.iduser
      WHERE p.idpopup = $1
    `;
    
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      console.log(`❌ Popup con ID ${id} no encontrado`);
      return res.status(404).json({ 
        message: `Popup con ID ${id} no encontrado`,
        id: parseInt(id)
      });
    }

    const popupData = rows[0];
    
    // Estructurar la respuesta
    const responseData = {
      idpopup: popupData.idpopup,
      imagen: popupData.imagen,
      nombre: popupData.nombre,
      ubicacion: popupData.ubicacion,
      barrio: popupData.nombrebarrio || 'Barrio no encontrado',
      usuario: popupData.iduser ? {
        iduser: popupData.iduser,
        nombreuser: popupData.nombreuser,
        email: popupData.email,
        contrasenia: popupData.contrasenia,
        favoritos: popupData.favoritos,
        plan: popupData.plan,
        idestilo: popupData.idestilo,
        idbarrio: popupData.usuario_idbarrio
      } : null
    };

    console.log(`✅ Popup completo con ID ${id} obtenido exitosamente`);
    
    return res.status(200).json({
      message: 'Popup completo obtenido',
      data: responseData
    });
    
  } catch (error) {
    console.error('❌ Error al obtener popup completo:', error);
    
    if (error.code === '23503') {
      return res.status(400).json({
        message: 'Error de referencia: El popup hace referencia a un barrio o usuario que no existe',
        error: 'Foreign key constraint failed'
      });
    }
    
    return res.status(500).json({ 
      message: 'Error interno del servidor al obtener popup completo',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// OBTENER BARRIO POR ID
async function getBarrioById(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(
      'SELECT nombre FROM barrio WHERE idbarrio = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Barrio no encontrado' });
    }

    return res.status(200).json({ nombre: result.rows[0].nombre });
  } catch (error) {
    console.error('❌ Error obteniendo barrio:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  listEvents,
  getEventDetail,
  getEventFullDetail,
  getBarrioById
};
