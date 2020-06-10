const express = require('express');
const router = express.Router();
const Bar = require('../models/Bar');


//GET BARS

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

// GET BAR BY ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Bar.findById(req.params.id);
    console.log(item.menu);
    const bar = {
      name: item.name,
      main_image: item.main_image,
      description: item.description,
      working_hours: item.working_hours,
      rating: item.rating,
      cost: item.cost,
      phone: item.phone,
      pictures: item.pictures,
      menu: item.menu,
      instagram: item.social_media.insta,
      email: item.social_media.email,
      twitter: item.social_media.twitter,
      facebook: item.social_media.facebook,
      available: item.available,
      associate: item.associate,
      zone: item.location.zone,
      address: item.location.address,
      views: item.views
    }
    console.log(bar.menu);
    return res.status(200).json({
      success: true,
      data: bar
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
  console.log('hi');
  try {
      const sm = {
        twitter: req.body.twitter,
        insta: req.body.instagram,
        email: req.body.email,
        facebook: req.body.facebook
        
      }
      console.log(sm);
      const loc = {
        zone: req.body.zone,
        address: req.body.address
      }
      console.log(loc);
      // Destructuring de lo que manda el usuario
      const bar = {
        name: req.body.name,
        main_image: req.body.main_image,
        description: req.body.description,
        working_hours: req.body.working_hours,
        rating: req.body.rating,
        cost: req.body.cost,
        phone: req.body.phone,
        pictures: req.body.pictures,
        menu: req.body.menu,
        social_media: sm,
        available: req.body.available,
        associate: req.body.associate,
        location: loc,
        views: req.body.views
        
      }
      console.log(bar);
      const newBar = await Bar.create(bar);

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          
          success: true,
          // token,
          newBar
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

router.put('/update/:id', async (req, res) => {
  try {

    const {
      name,
      main_image,
      description,
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

    const newItem = await Bar.findOneAndUpdate({ _id: req.params.id }, {
      name,
      main_image,
      description,
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
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newItem
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});


module.exports = router;