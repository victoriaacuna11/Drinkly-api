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
const passport = require('passport');

dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

//Import Routes
const userpruebaRoute = require('./routes/userprueba');

const adRoute = require('./routes/advertisement.route');
const barRoute = require('./routes/bar.route');
const drinkRoute = require('./routes/drink.route');
const ingredientRoute = require('./routes/ingredient.route');
const zoneRoute = require('./routes/zone.route');
const userRoute = require('./routes/user.route');


// const reviewsRoute = require('./routes/reviews');
// const userRoute = require('./routes/user');
// const authRoute = require('./routes/auth');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); 


//Set Static Folder
app.use(express.static(path.join(__dirname, 'user')));

// Uploads image
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
});
app.use(multer({ storage }).single('image'));

// Shows every request (console)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Routes
app.use('/api/usersprueba', userpruebaRoute);
app.use('/api/adver', adRoute);
app.use('/api/bar', barRoute);
app.use('/api/drink', drinkRoute);
app.use('/api/ingredient', ingredientRoute);
app.use('/api/zone', zoneRoute);
app.use('/api/user', userRoute);



// app.use('/api/auth', authRoute);
// app.use('/api/users', userRoute);
// app.use('/api/reviews', reviewsRoute);

// Port
const PORT = process.env.PORT || 3000;

// Server Running
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));