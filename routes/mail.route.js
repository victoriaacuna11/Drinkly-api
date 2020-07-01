const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/recipe', async (req, res) => {
    console.log('hi')
    try {
      const data = {
        email,
        username,
        owner_name,
        name,
        description,
        recipe,
        ingredients,
        message,

    } = req.body
    console.log({
      data
    })

    let outputAdmin = `
    <h3>¡Nueva receta publicada!</h3>
    </br>
    <b>${data.name}</b>
    <br></br>
    <br></br>
    <em>Descripción</em>
    <p>${data.description}</p>
    <em>Receta</em>
    <p>${data.recipe}</p>
    <em>Ingredientes</em>
    <p>${data.ingredients}</p>
    <b>Escrita por ${data.owner_name} (@${data.username})</b>
    <p>${data.message}</p>
    `




    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'drinkly.official@gmail.com',
            pass: 'DRINKLY20.'
        }
    });

    // send mail with defined transport object
    let infoAdmin = await transporter.sendMail({
        from: '"Drinkly Team" <drinkly.official@gmail.com>', // sender address
        to: 'drinkly.official@gmail.com', // list of receivers
        subject: "¡Han publicado una nueva receta!", // Subject line
        text: "¡Han publicado una nueva receta!", // plain text body
        html: outputAdmin, // html body
    });



  console.log("Message sent: %s", infoAdmin.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoAdmin));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



    return res.status(200).json({
        success: true,
        data: 'Email has been sent'
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
  
})


router.post('/user', async (req, res) => {
    try {
      const data = {
        email,
        username,
        owner_name,
        name,
        description,
        recipe,
        ingredients,
        message,

    } = req.body
    console.log({
      data
    })

    

    let outputClient = `
    <h3>¡${data.owner_name}, gracias por ser parte de Drinkly!</h3>
    </br>
    </br>
    <p>Tu receta ha sido enviada al correo de los administradores. Ellos se encargarán de revisarla y publicarla.</p>
    <p>En caso de que hayas elegido publicarla como anónimo no se revelarán tus datos, en caso contrario te daremos créditos.</p>
    </br></br>
    <em>Esta es la receta que publicaste...</em></br>
    <p>${data.name}</p></br>
    <p>${data.description}</p>
    <p>${data.recipe}</p>
    <em>Ingredientes</em>
    <p>${data.ingredients}</p>
    `

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'drinkly.official@gmail.com',
            pass: 'DRINKLY20.'
        }
    });

    

    // Send email to the user.
    let infoClient = await transporter.sendMail({
        from: '"Drinkly Team" <drinkly.official@gmail.com>',
        to: data.email, 
        subject: "¡Gracias por publicar!", 
        text: "¡Gracias por publicar!", 
        html: outputClient, 
    });

  console.log("Message sent: %s", infoClient.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoClient));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...



    return res.status(200).json({
        success: true,
        data: 'Email has been sent'
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
  
  })


module.exports = router;
