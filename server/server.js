require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

connectDB();
const app = express();

// Middlewares
app.use(express.static('upload'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Routes
app.use('/api', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
