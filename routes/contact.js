const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const { gmail } = require('googleapis/build/src/apis/gmail');


router.post('/contact', (req, res) => {

  console.log(req.body)

  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env_REDIRECT_URI)

  oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
  

  const output = `
    <p> You have a new contact request  </p>
    <h3> Contact Details </h3>
    <ul>
        <li> name: ${req.body.name}</li>
        <li> People: ${req.body.email}</li>
        <li> Message: ${req.body.message}</li>
        <li> Date: ${req.body.phone}</li>
    </ul>
        `


  async function sendMail(){
    try{
      const accessToken = await oAuth2Client.getAccessToken()
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
          type: 'OAUTH2',
          user: process.env.email,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken
        },
        tls: { rejectUnauthorized: false }
      })
  
      const mailOptions = {
        from: 'Portfolio <skthedev22@gmail.com>',
        to: 'skassanjee@gmail.com',
        subject: 'New Portfolio Message!',
        text: 'hello fromm api text',
        html: output
      };

  
      const result = await transport.sendMail(mailOptions)
      return result
    }catch(error){
        return error
      }
    }
  


    
  sendMail().then((result) => console.log('email sent.......', result)
  ).catch((error) => console.log(error.message))
  

  
  res.render('contact', {msg: 'email has been sent'})


}) 

module.exports = router