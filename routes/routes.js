const express = require('express')
const router = express.Router()
const Projects = require('../public/data/projects')


router.get('/', (req, res) => {
   let Proj = JSON.parse(JSON.stringify(Projects))
    console.log(Proj)
    res.render('home', {projects: Proj})
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.post('/send', (req, res, next) =>{
    console.log(req.body)
})
module.exports = router;