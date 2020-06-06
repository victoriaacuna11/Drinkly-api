const express = require('express');
const router = express.Router();
const User = require('../models/userprueba');


router.post('/adduser', async (req, res) => {
    try {
        // Destructuring de lo que manda el usuario
        const {
            firstName,
            lastName,
            email
        } = req.body

        
        const user = await User.create({
            firstName,
            lastName,
            email
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


router.get('/', async (req, res) => {
    try {
      const users = await User.find();
  
      return res.status(200).json({
        success: true,
        data: users
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