const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET GAMES

router.get('/', async (req, res) => {
    try {
      const games = await Game.find();
  
      return res.status(200).json({
        success: true,
        data: games
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


// POST A NEW GAME  
router.post('/add', async (req, res) => {
  try {
      // Destructuring de lo que manda el usuario
      const {
          name,
          available,
          description,
          photo,
          rules
      } = req.body

      
      const game = await Game.create({
        name,
        available,
        description,
        photo,
        rules
      });

      
      // Send a new token to the client (frontend)
      return res.status(200).json({
          success: true,
          // token,
          data: game
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

//GET GAME

router.get('/:id', async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
  
      return res.status(200).json({
        success: true,
        data: game
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

// UPDATE A GAME
router.put('/update/:id', async (req, res) => {
  try {

    const {
      name,
      description,
      rules,
      photo,
      available
    } = req.body

    const newGame = await Game.findOneAndUpdate({ _id: req.params.id }, {
      name,
      description,
      rules,
      photo,
      available
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newGame
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});


// DELETE A GAME
router.delete('/delete/:id', async (req, res) => {
  try {
    
    Game.deleteOne({_id: req.params.id}, (err, item) => {
      if(err){
          res.json(err);
      }
      else {
          res.json(item);
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