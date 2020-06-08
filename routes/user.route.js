const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../models/User');


//GET USER

router.get('/', async (req, res) => {
    try {
      const user = await User.find();
  
      return res.status(200).json({
        success: true,
        data: user
      });
  
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error ' + err
        });
      }
    }
  
  });

  
//   // ADD  USER
// router.post('/add', async (req, res) => {
//   try {
//       // Destructuring de lo que manda el usuario
//       const {
//         f_name,
//         l_name,
//         email,
//         user_name,
//         password,
//         birthday,
//         favorites,
//         available
//       } = req.body

      
//       const newUser = await User.create({
//           f_name,
//           l_name,
//           email,
//           user_name,
//           password,
//           birthday,
//           favorites,
//           available
          
//       });

      
//       // Send a new token to the client (frontend)
//       return res.status(200).json({
//           success: true,
//           // token,
//           user
//       });

//   } catch (err) {
//       if (err.name === 'ValidationError') {
//           const messages = Object.values(err.errors).map(val => val.message);

//           return res.status(400).json({
//               success: false,
//               error: messages
//           });
//       } else {
//           return res.status(500).json({
//               success: false,
//               error: 'Server Error ' + err
//           });
//       }
//   }

// });

router.post('/register', async (req, res, next) =>{

  let newUser = new User({
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    user_name: req.body.user_name,
    password: req.body.password,
    birthday: req.body.birthday,
    favorites: req.body.favorites,
    available: req.body.available

  });

  User.addUser(newUser, (err, newUser) => {
    if(err){
      res.json({success:false, msg: "No se pudo registrar usuario"})
    }else {
      res.json({success:true, msg: "Se registró el usuario"})
    }
  });
});




module.exports = router;