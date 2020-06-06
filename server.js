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

// const bank_accountsRoute = require('./routes/bank_accounts');
// const choiceRoute = require('./routes/choice');
// const conversationRoute = require('./routes/conversation');
// const facturaRoute = require('./routes/factura');
// const questionRoute = require('./routes/question');
// const reviewsRoute = require('./routes/reviews');
// const specialtyRoute = require('./routes/specialty');
// const testRoute = require('./routes/test');
// const userRoute = require('./routes/user');
// const authRoute = require('./routes/auth');
// const roleRoute = require('./routes/roles');

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Uploads user avatars
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
});
app.use(multer({ storage }).single('image'));

// Muestra todos los request en la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Routes
app.use('/api/usersprueba', userpruebaRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/users', userRoute);
// app.use('/api/bank-accounts', bank_accountsRoute);
// app.use('/api/choice', choiceRoute);
// app.use('/api/conversation', conversationRoute);
// app.use('/api/factura', facturaRoute);
// app.use('/api/question', questionRoute);
// app.use('/api/reviews', reviewsRoute);
// app.use('/api/specialities', specialtyRoute);
// app.use('/api/test', testRoute);
// app.use('/api/roles', roleRoute);

// Port
const PORT = process.env.PORT || 3000;

// Server Running
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));