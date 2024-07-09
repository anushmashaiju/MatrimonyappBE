const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors');
const dotenv = require('dotenv')
const session = require('express-session');
const passport = require('passport');
const cookieParser = require ('cookie-parser');
//const bodyParser =require ('body-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const connectDb = require('./Config/db');
const passportSetup = require('./Middleware/passport');
const authRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRegisterRoutes');
const userProfileRouter = require('./Routes/userProfileRoutes');
const userPreferenceRouter = require('./Routes/userPreferenceRoutes')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
passportSetup(passport);

// Routes
app.use('/auth', authRouter);
app.use('/userpersonal', userProfileRouter);
app.use('/user', userRouter);
app.use('/userpreferences', userPreferenceRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});

// Socket.io integration
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});