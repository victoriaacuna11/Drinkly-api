const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

//Import Routes

const userpruebaRoute = require('./routes/userprueba');


// const reviewsRoute = require('./routes/reviews');
// const userRoute = require('./routes/user');
// const authRoute = require('./routes/auth');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Uploads user avatars
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, 'public/uploads'),
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + path.extname(file.originalname))
//   }
// });
// app.use(multer({ storage }).single('image'));

// Shows every request (console)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Routes
app.use('/api/usersprueba', userpruebaRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/users', userRoute);
// app.use('/api/reviews', reviewsRoute);

// Port
const PORT = process.env.PORT || 3000;

// Server Running
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));