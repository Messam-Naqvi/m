// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { body, validationResult } = require('express-validator');

// Initialize Express
const app = express();
app.set('trust proxy', true);
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Rate limiting to prevent DDOS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// MongoDB Connection
const dbURI = 'mongodb://0.0.0.0/Messam-Naqvi'; // Replace with your actual MongoDB connection string
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the Contactus Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { collection: 'Contactus' });

const Contactus = mongoose.model('Contactus', contactSchema);

// Routes
app.post('/api/contact', [
  // Validation middleware
  body('name').isLength({ min: 3, max: 40 }).matches(/^[A-Za-z\s]+$/).withMessage('Name must be 3-40 characters long and contain only letters and spaces.'),
  body('email').isEmail().withMessage('Invalid email address.'),
  body('message').isLength({ min: 3 }).withMessage('Message must be at least 3 characters long.')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    const newContact = new Contactus({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
