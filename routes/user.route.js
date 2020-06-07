const express = require('express');
const router = express.Router();
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

  
  // ADD  INGREDIENT
router.post('/add', async (req, res) => {
  try {
      // Destructuring de lo que manda el usuario
      const {
        f_name,
        l_name,
        email,
        user_name,
        password,
        birthday,
        favorites,
        available
      } = req.body

      
      const user = await User.create({
          f_name,
          l_name,
          email,
          user_name,
          password,
          birthday,
          favorites,
          available
          
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          user
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



module.exports = router;