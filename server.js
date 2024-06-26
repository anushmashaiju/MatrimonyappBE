const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors');
const dotenv = require('dotenv')
const session = require('express-session');
const authRouter = require('./Routes/authRoutes');
const verifyRouter = require ('./Routes/verify-route')
const connectDb = require('./Config/db');

const passport = require('./Middleware/passport');
const app = express();
dotenv.config();

app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware

// app.use(cors(corsOptions));



// Routes
app.use('/auth', authRouter);
app.use('/verify', verifyRouter);

app.get('/',(req,res)=>{
  res.send('Welcome to the API');
})
// const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  connectDb()
  console.log(`Server running on port 8000`)
});
