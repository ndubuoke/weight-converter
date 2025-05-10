const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Add built-in JSON body parser middleware
app.use(express.json());

// Log endpoint
app.post('/log', (req, res) => {
  try {
    console.log(JSON.stringify(req.body));  // Log to Docker stdout
    res.status(200).send('Log received');
  } catch (error) {
    console.error('Error processing log:', error);
    res.status(500).send('Error processing log');
  }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Serve React app (for any other route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});