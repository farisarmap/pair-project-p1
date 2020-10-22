const Controller = require('../../controller/controller')
const router = require('express').Router()

router.get('/', Controller.songData)

module.exports = router