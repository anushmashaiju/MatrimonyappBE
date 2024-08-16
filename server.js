const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const connectDb = require('./Config/db');
const passportSetup = require('./Middleware/passport');
const authRouter = require('./Routes/authRoutes');

const userProfileRouter = require('./Routes/Matrimony/userProfileRoutes');
const userPreferenceRouter = require('./Routes/Matrimony/userPreferenceRoutes');
const userRegisterRouter = require ('./Routes/userRegisterRoutes')
const  useremployementRouter = require ('./Routes/employement')
const  chatRouter = require ('./Routes/Matrimony/chatRoutes.js')
const requestRouter =require ('./Routes/Matrimony/requestRoutes.js')
//const  connectingMatrimonyRouter = require ('./Routes/Matrimony/connectingMatrimonyRoutes')

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('chat message', (msg) => {
    io.to(msg.receiverId).emit('message', msg);
  });
});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set secure to true if using https
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());
passportSetup(passport);

// Routes
app.use('/auth', authRouter);
app.use('/user', userProfileRouter);
app.use('/user', userPreferenceRouter);
app.use('/user', userRegisterRouter);
app.use('/user', useremployementRouter);
app.use('/user', requestRouter);
app.use('/chats', chatRouter);

//app.use('/user', connectingMatrimonyRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 8000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection error:', err);
});
