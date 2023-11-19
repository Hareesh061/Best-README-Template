// log_ingestor.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

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

app.use(bodyParser.json());

app.post('/logs', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send('Log ingested successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Log Ingestor is running on http://localhost:${PORT}`);
});
