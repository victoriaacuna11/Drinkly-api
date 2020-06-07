const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');


//GET INGREDIENTS

router.get('/', async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
  
      return res.status(200).json({
        success: true,
        data: ingredients
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
          name,
          available,
          photo,
          category
      } = req.body

      
      const ing = await Ingredient.create({
          name,
          available,
          photo,
          category
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          ing
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