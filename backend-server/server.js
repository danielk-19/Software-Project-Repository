// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://cloudchasers:joshuaTang123!@software-project.yrguefx.mongodb.net/?retryWrites=true&w=majority&appName=software-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataSchema = new mongoose.Schema({
  data: String,
  timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema);

const app = express();
app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoint to receive data
app.post('/api/data', async (req, res) => {
  const { data } = req.body;
  const newData = new Data({ data });
  await newData.save();
  res.status(201).send('Data received');
});

// API endpoint to fetch all data
app.get('/api/data', async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
