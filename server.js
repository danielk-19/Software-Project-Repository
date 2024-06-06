// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://cloudchasers:joshuaTang123%21@software-project.yrguefx.mongodb.net/software-project?retryWrites=true&w=majority&appName=software-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
});

const dataSchema = new mongoose.Schema({
  data: String,
  timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema);

const app = express();

// Configure CORS options 
const corsOptions = { origin: 'https://danielk-19.github.io',  optionsSuccessStatus: 200, }; 
// Apply CORS middleware 
app.use(cors(corsOptions)); 
// Enable preflight requests for all routes 
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

// API endpoint to receive data
app.post('/api/data', async (req, res) => {
  const { data } = req.body;
  const newData = new Data({ data });
  await newData.save();
  res.status(201).send('Data received');
});

// API endpoint to fetch all data
app.get('/api/data', async (req, res, next) => {
  // const allData = await Data.find();
  // res.json(allData);
  console.log(`CORS middleware applied to ${req.method} ${req.url}`); 
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
