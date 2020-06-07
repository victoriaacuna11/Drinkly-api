const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink');


//GET ADS

router.get('/', async (req, res) => {
    try {
      const drinks = await Drink.find();
  
      return res.status(200).json({
        success: true,
        data: drinks
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
          description,
          recipe,
          ingredients,
          owner,
          pictures,
          available,
          views
          
      } = req.body

      
      const drink = await Drink.create({
        name,
        description,
        recipe,
        ingredients,
        owner,
        pictures,
        available,
        views
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          drink
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