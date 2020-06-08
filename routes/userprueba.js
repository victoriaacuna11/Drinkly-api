const express = require('express');
const router = express.Router();
const User = require('../models/userprueba');


router.post('/adduser', async (req, res) => {
    try {
        // Destructuring de lo que manda el usuario
        const {
            firstName,
            lastName,
            email,
            editable
        } = req.body

        
        const user = await User.create({
            firstName,
            lastName,
            email,
            editable
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

  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
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

  router.delete('/delete/:id', async (req, res) => {
    try {
      // const user = await User.findById(req.params.id);
      User.deleteOne({_id: req.params.id}, (err, user) => {
        if(err){
            res.json(err);
        }
        else {
            res.json(user);
        }
    })
  
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


  router.put('/update/:id', async (req, res) => {
    try {
  
      const {
        firstName,
        lastName,
        email,
        editable,
      } = req.body
  
      const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
        firstName,
        lastName,
        email,
        editable
      }, { returnOriginal: false, useFindAndModify: false });
  
      return res.status(200).json({
        success: true,
        data: newUser
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error ' + err
      });
    }
  });

  module.exports = router;