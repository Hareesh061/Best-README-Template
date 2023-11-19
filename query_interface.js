// query_interface.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/logsdb', { useNewUrlParser: true, useUnifiedTopology: true });

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: Date,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

const Log = mongoose.model('Log', logSchema);

app.use(express.static(path.join(__dirname, 'query-interface')));
app.use(express.json());

// query_interface.js
app.get('/search', async (req, res) => {
    try {
      const query = buildQuery(req.query);
      const result = await Log.find(query).lean(); // Add .lean() for plain JavaScript objects
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  function buildQuery(queryParams) {
    const query = {};
    if (queryParams.level) query.level = queryParams.level.toLowerCase(); // Ensure case-insensitive search
    // ... (other filters)
    return query;
  }
  

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Query Interface is running on http://localhost:${PORT}`);
});
