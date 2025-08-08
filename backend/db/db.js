const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL no está definido. Crea un archivo .env basado en .env.example');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requiere SSL
  ssl: { rejectUnauthorized: false },
  // Configuraciones adicionales para mejor rendimiento
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

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