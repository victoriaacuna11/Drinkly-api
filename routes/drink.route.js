const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink');
const cloudinary = require('cloudinary');


//GET 

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

  //FILTER
router.get('/:filter', async (req, res) => {
    try {

      let aux=req.params.filter.split(',')
      const drinks = await Drink.find({ingredients:{$all:aux}});

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

  //GET DRINK BY ID


  router.get('/get/:id', async (req, res) => {
    console.log('hi');
    try {
      const drink = await Drink.findById(req.params.id);
      
      return res.status(200).json({
        success: true,
        data: drink
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
  
  // ADD  
  router.post('/add', async (req, res) => {
    try {
  
        // Destructuring de lo que manda el usuario
        console.log(req.body.name);


        let drink = {
          name : req.body.name,
          description : req.body.description,
          recipe : req.body.recipe,
          ingredients : req.body.ingredients,
          owner : req.body.owner,
          pictures : req.body.pictures,
          available : req.body.available,
          views : req.body.views 
        }

        console.log(drink);

        const newDrink = await Drink.create(drink);
        
        // Send a new token to the client (frontend)
        return res.status(200).json({
            success: true,
            // token,
            newDrink
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
   
 
// UPDATE DRINK
router.put('/update/:id', async (req, res) => {
  try {

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

    const newDrink = await Drink.findOneAndUpdate({ _id: req.params.id }, {
      name,
      description,
      recipe,
      ingredients,
      owner,
      pictures,
      available,
      views
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newDrink
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

    const url  = await cloudinary.v2.uploader.upload(req.file.path);
    let drink = {
      name : req.body.name,
      description : req.body.description,
      recipe : req.body.recipe,
      ingredients : req.body.ingredients,
      owner : req.body.owner,
      pictures : url.secure_url,
      available : req.body.available,
      views : req.body.views 
    }

    const newDrink = await Drink.findOneAndUpdate({ _id: req.params.id }, drink, 
      { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newDrink
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});


// DELETE 
router.delete('/delete/:id', async (req, res) => {
  try {
    
    Drink.deleteOne({_id: req.params.id}, (err, drink) => {
      if(err){
          res.json(err);
      }
      else {
          res.json(drink);
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

