const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');


//GET ADS

router.get('/', async (req, res) => {
    try {
      const ads = await Advertisement.find();
  
      return res.status(200).json({
        success: true,
        data: ads
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


// ADD  ADVERTISEMENT
router.post('/add', async (req, res) => {
  try {
      // Destructuring de lo que manda el usuario
      const {
          promo_img,
          available
      } = req.body

      
      const ad = await Advertisement.create({
        promo_img,
        available
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          ad
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