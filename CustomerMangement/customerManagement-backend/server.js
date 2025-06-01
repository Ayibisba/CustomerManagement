'use strict';

require('dotenv').config();
const express = require('express');
const process = require('process');
const http = require('http');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

// Import des routes
const customerRoutes = require('./routes/customerRoute');

// Middleware
app.use(express.json());
app.use(cors());

// Créer un serveur HTTP
const server = http.createServer(app);

 // Gère proprement les erreurs clients (comme connexions mal fermées)
server.on('clientError', (err, socket) => {
  console.error('❌ clientError:', err.message);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  socket.destroy();
});

// Routes
app.use('/api/customers', customerRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('✅ Customer Management API is running!');
});

// Import et synchronisation de la base de données
const db = require('./models');

// Synchroniser les modèles avec la base de données
db.sequelize.sync({ force: false }) // force: false pour ne pas supprimer les données
  .then(() => {
    console.log('✅ Base de données synchronisée.');

    // Démarrage du serveur
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de synchronisation avec la base de données :', err.message);
  });