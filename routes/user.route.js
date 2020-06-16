const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../models/User');


//GET USERS

router.get('/', async (req, res) => {
    try {
      const user = await User.find();
  
      return res.status(200).json({
        success: true,
        data: user
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



//REGISTER USER
//Metodo para registrar un nuevo usuario, aqui recibe lo que venga del form, y en el método addUser encripta la contraseña
//y salva el nuevo usuario, si todo sale bien.
router.post('/register', async (req, res, next) =>{

  let newUser = new User({
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    user_name: req.body.user_name,
    password: req.body.password,
    birthday: req.body.birthday,
    favorites: req.body.favorites,
    available: req.body.available,
    isAdmin: req.body.isAdmin

  });

  User.addUser(newUser, (err, newUser) => {
    if(err){
      res.json({success:false, msg: "No se pudo registrar usuario"})
    }else {    
      const expiresIn = 86400;
      const token = jwt.sign(newUser.toJSON(), process.env.TOKEN_SECRET, {
        expiresIn: expiresIn  //el usuario tiene que volver a loguearse luego de 1 dia
      });  
      res.json({success:true, 
        token: 'JWT '+token, 
        expiresIn: expiresIn, 
        msg: "Se registró el usuario"});
    }
  });
});


//AUTHENTICATE USER
//Ruta de autenticación. Busca en la BD si hay un usuario con el username del request. Si no lo hay da un error (son buenas prácticas
// no especificar si el erro fue por la contraseña o por el nombre de usuario, porque eso le da información a los hackerosos).
//Si existe el usuario, emplea un método para comparar la contraseña; si la contraseña es correcta entonces todo fino
//y nos crea el token.

router.post('/authenticate', (req, res, next) => {
  const username= req.body.user_name;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'Los datos suministrados son incorrectos.'}); //fallo por nombre de usuario
    }

    User.checkPassword(password, user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const expiresIn = 86400;
        const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {
          expiresIn: expiresIn //el usuario tiene que volver a loguearse luego de 1 dia
        });

        res.json({success: true, 
          token: 'JWT '+token, 
          expiresIn: expiresIn,
          user: {
            id: user._id,
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
            user_name: user.user_name,
            birthday: user.birthday,
            available: user.available,
            favorites: user.favorites,
            isAdmin: user.isAdmin

          },
          
         });

      } else{
        return res.json({success: false, msg: 'Los datos suministrados son incorrectos.'});//fallo por contraseña incorrecta
      }
    });
  });
});

// // DELETE USER
// router.delete('/delete/:id', async (req, res) => {
//   try {
    
//     User.deleteOne({_id: req.params.id}, (err, item) => {
//       if(err){
//           res.json(err);
//       }
//       else {
//           res.json(item);
//       }
//   })
// } catch (err) {
//   if (err.name === 'ValidationError') {
//     const messages = Object.values(err.errors).map(val => val.message);

//     return res.status(400).json({
//       success: false,
//       error: messages
//     });
//   } else {
//     return res.status(500).json({
//       success: false,
//       error: 'Server Error ' + err
//     });
//   }
// }
// });



//USER PROFILE
//Rutas protegidas
router.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res, next)=>{
  res.json({user: req.user});
});

router.get('/isAdmin', passport.authenticate('jwt', {session: false}), async (req, res, next)=>{
  res.send(req.user.isAdmin);
});

//GET USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user
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
      f_name,
      l_name,
      email,
      user_name,
      password,
      birthday,
      favorites,
      available,
      isAdmin
    } = req.body

    const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
      f_name,
      l_name,
      email,
      user_name,
      password,
      birthday,
      favorites,
      available,
      isAdmin
    }, { returnOriginal: false, useFindAndModify: false });

    return res.status(200).json({
      success: true,
      data: newUser
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error ' + err
    });
  }
});



module.exports = router;