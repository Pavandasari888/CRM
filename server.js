require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Import routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const leadRoutes = require('./routes/leadRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Register routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/settings', settingsRoutes);

// Global error handler
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
