// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
 
const app = express();
 
// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  next();
});
 
const corsOptions = {
  origin: 'https://danielk-19.github.io/Software-Project-Repository/', // Replace with your frontend's URL
  optionsSuccessStatus: 200,
};
 
// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
 
// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb+srv://cloudchasers:joshuaTang123%21@software-project.yrguefx.mongodb.net/software-project?retryWrites=true&w=majority&appName=software-project';
 
const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false, // Ensures certificates are validated
  }).then(() => {
    console.log('MongoDB is connected');
  }).catch((err) => {
    console.error('MongoDB connection unsuccessful, retry after 5 seconds.', err);
    setTimeout(connectWithRetry, 5000);
  });
};
 
connectWithRetry();
 
const dataSchema = new mongoose.Schema({
  data: String,
  timestamp: { type: Date, default: Date.now },
});
 
const Data = mongoose.model('Data', dataSchema);
 
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
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    next(err);
  }
});
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});