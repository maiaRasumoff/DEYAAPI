const { Pool } = require('pg');
const dotenv = require('dotenv');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requiere SSL
  ssl: { rejectUnauthorized: false },
  // Configuraciones adicionales para mejor rendimiento
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

console.log('🔗 DATABASE_URL:', process.env.DATABASE_URL);

pool.query('SELECT * FROM popup LIMIT 1')
  .then(res => console.log('Prueba OK:', res.rows))
  .catch(err => console.error('Prueba FAIL:', err));


dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL no está definido. Crea un archivo .env basado en .env.example');
  process.exit(1);
}



// Test de conexión
pool.on('connect', () => {
  console.log('✅ Conectado a Supabase PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en la conexión a la base de datos:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}; 