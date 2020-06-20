const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');


// GET ZONES

router.get('/', async (req, res) => {
    try {
      const zones = await Zone.find();
  
      return res.status(200).json({
        success: true,
        data: zones
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


// POST A NEW ZONE  
router.post('/add', async (req, res) => {
  try {
      // Destructuring de lo que manda el usuario
      const {
          name,
          available
      } = req.body

      
      const zone = await Zone.create({
        name,
        available
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          zone
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

// UPDATE A ZONE
router.put('/update/:id', async (req, res) => {
  try {

    const {
      name,
      available
    } = req.body

    const newZone = await Zone.findOneAndUpdate({ _id: req.params.id }, {
      name,
      available
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newZone
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});


// DELETE A ZONE
router.delete('/delete/:id', async (req, res) => {
  try {
    
    Zone.deleteOne({_id: req.params.id}, (err, zone) => {
      if(err){
          res.json(err);
      }
      else {
          res.json(zone);
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

//GET ZONE

router.get('/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: zone
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