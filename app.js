

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const indxRoutes = require('./routes/routes')
const contactRoutes = require('./routes/contact')

const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const { gmail } = require('googleapis/build/src/apis/gmail');


require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

//Templataing engine
app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(indxRoutes)
app.use(contactRoutes)


app.use((req, res) =>{
  res.send('404')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log('process running on ' + PORT)
})