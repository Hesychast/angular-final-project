const express = require('express');
const path = require('path');
const app = express();

// Use static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/articles-app')));

// All requests redirects to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/articles-app/index.html'));
});

// Run the server on the Heroku appointment port or locally, on port 8080.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
