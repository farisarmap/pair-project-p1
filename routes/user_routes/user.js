const Controller = require('../../controller/controller')
const router = require('express').Router()

router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)
router.get('/register', Controller.getRegister)
router.post('/register', Controller.postRegister)

router.use((req, res, next) => {
    if(!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/user/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/', Controller.userData)
router.get('/addPlaylist', Controller.getAddPlaylist)
router.post('/addPlaylist', Controller.postAddPlaylist)
router.get('/playlist', Controller.playlistData)
router.get('/playlist/:id', Controller.seePlaylist)
router.get('/delete/:id', Controller.deletePlaylist)
router.get('/edit/:id', Controller.getEditUser)
router.post('/edit/:id', Controller.postEditUser)
router.get('/addPlaylist/:id', Controller.getSongtoPlaylist)



module.exports = router