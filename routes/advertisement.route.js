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

  
  //GET INGREDIENT

router.get('/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: ad
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
          client,
          available
      } = req.body

      
      const ad = await Advertisement.create({
        promo_img,
        client,
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

// UPDATE INGREDIENT
router.put('/update/:id', async (req, res) => {
  try {

    console.log(req);
    const {
        promo_img,
        client,
        available
    } = req.body

    const newIngredient = await Advertisement.findOneAndUpdate({ _id: req.params.id }, {
        promo_img,
        client,
        available
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newIngredient
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});

router.put('/update/photo/:id', async (req, res) => {
  try {

    // const url  = await cloudinary.v2.uploader.upload(req.file.path);
    let ad = {
        promo_img:req.body.promo_img,
        client:req.body.client,
        available:req.body.available
    }

    const newIngredient = await Advertisement.findOneAndUpdate({ _id: req.params.id }, ad, 
      { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newIngredient
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }

  

});

// DELETE INGREDIENT
router.delete('/delete/:id', async (req, res) => {
  try {
    
    Advertisement.deleteOne({_id: req.params.id}, (err, ingredient) => {
      if(err){
          res.json(err);
      }
      else {
          res.json(ingredient);
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