const router = require('express').Router()
const user_routes = require('./user_routes/user')
const song_routes = require('./song_routes/song')
const Controller = require('../controller/controller')

// router.get('/login', Controller.getLogin)
router.use('/user', user_routes)

router.use((req, res, next) => {
    if(!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/user/login?error=${error}`)
    } else {
        next()
    }
})

router.use('/song', song_routes)

module.exports = router