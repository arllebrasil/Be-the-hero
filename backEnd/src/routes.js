const express = require("express")
const crypto = require('crypto')

const ongsControoller = require('./controllers/ongsController')
const incidentsController = require('./controllers/incidentsController')
const profilleController = require('./controllers/profilleController')
const sessionController = require('./controllers/sessionController')

const routes = express.Router()

routes.get('/ongs',ongsControoller.index)
routes.post('/ongs',ongsControoller.create)

routes.get('/incidents',incidentsController.index)
routes.post('/incidents',incidentsController.create)
routes.delete('/incidents/:id',incidentsController.delete)

routes.get('/profile',profilleController.index)
routes.post('/sessions',sessionController.create)
module.exports = routes