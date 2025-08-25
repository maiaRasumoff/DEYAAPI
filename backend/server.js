const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const eventRouter = require('./routes/eventRouter');
const { logger, errorHandler } = require('./middlewares');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Permite todas las origenes en desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware personalizado
app.use(logger);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/event', eventRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Global error handler personalizado
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Servidor iniciado');
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/event`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log(`🔍 Nueva ruta: http://localhost:${PORT}/api/event/:id/full`);
  console.log(`🏘️  Ruta barrio: http://localhost:${PORT}/api/event/barrioId/:id`);
}); 