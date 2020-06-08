const express = require('express');
const router = express.Router();
const Bar = require('../models/Bar');


//GET ADS

router.get('/', async (req, res) => {
    try {
      const bars = await Bar.find();
  
      return res.status(200).json({
        success: true,
        data: bars
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

  
  // ADD  BAR
router.post('/add', async (req, res) => {
  try {
      // Destructuring de lo que manda el usuario
      const {
          name,
          working_hours,
          rating,
          cost,
          phone,
          pictures,
          menu,
          social_media,
          available,
          associate,
          location,
          views
      } = req.body

      
      const bar = await Bar.create({
        name,
        working_hours,
        rating,
        cost,
        phone,
        pictures,
        menu,
        social_media,
        available,
        associate,
        location,
        views
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          bar
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

// DELETE BAR
router.delete('/delete/:id', async (req, res) => {
  try {
    Bar.deleteOne({_id: req.params.id}, (err, bar) => {
      if(err){
          res.json(err);
      }
      else {
          res.json(bar);
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


module.exports = router;