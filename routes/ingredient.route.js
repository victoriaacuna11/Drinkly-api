const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dj63a52qb',
    api_key: '896664937925512',
    api_secret: 'jM01p0X2rJUuTRCRq9b0WLqN_wA'
})



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

  //GET INGREDIENT

router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    
    return res.status(200).json({
      success: true,
      data: ingredient
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
      // console.log(req.body);
      // const url  = await cloudinary.v2.uploader.upload(req.file.path);
      // console.log(url.secure_url);

      let ingredient = {
        name : req.body.name,
        category : req.body.category,
        available : req.body.available,
        photo : req.body.photo,
      }
      
      console.log(ingredient);
      const newIngredient = await Ingredient.create(ingredient);
      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          newIngredient
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
      name,
      category,
      available,
      photo,
    } = req.body

    const newIngredient = await Ingredient.findOneAndUpdate({ _id: req.params.id }, {
      name,
      category,
      available,
      photo,
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
    let ingredient = {
      name : req.body.name,
      category : req.body.category,
      available : req.body.available,
      photo : req.body.photo,
    }

    const newIngredient = await Ingredient.findOneAndUpdate({ _id: req.params.id }, ingredient, 
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
    
    Ingredient.deleteOne({_id: req.params.id}, (err, ingredient) => {
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

// router.post('/uploadImage', async (req, res) => {
//   console.log(req.body.name);
//   console.log(req.body.category);
//   console.log(req.body.available);
//   console.log(req.file);

//   const secure_url  = await cloudinary.v2.uploader.upload(req.file.path);
//   let ingredient = {
//       name : req.body.name,
//       category : req.body.category,
//       available : req.body.available,
//       photo : secure_url
//   }
//   console.log(ingredient.photo);
//   // if(req.file){
//   //   console.log(req.file);
//   // }
//   return res.json({file: req.file});
// })



module.exports = router;