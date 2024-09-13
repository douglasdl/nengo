// index.js (or app.js)
const express = require('express');
const app = express();
const port = 3000;

// Import the route
const convertRoutes = require('./routes/convert');

// Use the route
app.use('/api', convertRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Nengo API listening at http://localhost:${port}`);
});