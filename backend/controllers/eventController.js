const db = require('../db/db');

async function listEvents(req, res) {
  try {
    const { rows } = await db.query(
      'SELECT idpopup, titulo, descripcion, imagen FROM popup ORDER BY idpopup'
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron popups' });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error al listar popups:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function getEventDetail(req, res) {
  try {
    const { id } = req.params;

    const { rows } = await db.query(
      'SELECT idpopup, titulo, descripcion, imagen FROM popup WHERE idpopup = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Popup no encontrado' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener detalle del popup:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  listEvents,
  getEventDetail,
}; 