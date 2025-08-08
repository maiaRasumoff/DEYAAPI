const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
  // Fail fast with a clear message if DATABASE_URL is missing
  console.error('DATABASE_URL no está definido. Crea un archivo .env basado en .env.example');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requiere SSL; si usas localmente, ajusta esta opción según necesidad
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}; 