const { Playlist, Song, Subscribe, User, PlaylistSubscribe } = require('../models')
const bcrypt = require('bcryptjs')
const helperAge = require('../helper/helper')

class Controller {
    static songData(req, res) {
        Song.findAll()
            .then(data => res.render('song', {data}))
            .catch(err => res.send(err))
    }
    static userData(req, res) {
        User.findAll()
            .then(data => {
                res.render('user', { data, helperAge})
            })
            .catch(err => res.send(data))
    }
    static getRegister(req, res) {
        res.render('register')
    }
    static postRegister(req, res) {
        const { name, age, email, password } = req.body
        User.create({ name, age, email, password })
            .then(data => res.redirect('/user'))
            .catch(err => res.send(err))
    }
    static getLogin(req, res) {
        res.render('login')
    }
    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(data => {
                const isValid = bcrypt.compareSync(password, data.password)
                if (isValid) {
                    req.session.userId = data.id
                    res.redirect('/user')
                } else {
                    res.redirect('/user/login')
                }
            })
            .catch(err => res.send(err))
    }
    static getAddPlaylist(req, res) {
        Song.findAll()
            .then(data => res.render('playlist', { data }))
            .catch(err => res.send(err))
    }
    static postAddPlaylist(req, res) {
        let UserId = req.session.userId
        const { name, SongId } = req.body
        Playlist.create({ name, SongId, UserId })
            .then(data => {
                res.redirect('/user/playlist')
            })
            .catch(err => res.send(err))
    }
    static playlistData(req, res) {
        User.findAll({
            include: [{
                model: Playlist,
                include: Song 
            }] 
        })
            .then(data => {
                res.send(data)
                // res.render('playlistHome', { data })
            })
            .catch(err => res.send(err))
    }
    static deletePlaylist(req, res) {
        Playlist.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => res.redirect('/user/playlist'))
            .catch(err => res.send(err))
    }
    static getEditPlaylist(req, res) {
        Playlist.findByPk(req.params.id)
            .then(data => {
                res.render('editPlaylist', { data })
            })
            .catch(err => res.send(err))
    }
    static postEditPlaylist(req, res) {
        const { name } = req.body
        Playlist.update({ name }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => res.redirect('/user/playlist'))
            .catch(err => res.send(err))
    }
    static seePlaylist(req, res) {
        User.findByPk(req.params.id, {
            include: [{
                model: Playlist,
                include: Song
            }]
        })
            .then(data => {
                res.render('seePlaylist', { data })
            })
            .catch(err => res.send(err))
    }
    static getSongtoPlaylist(req, res) {
        let dataSong = null
        let dataPlaylist = null
        Playlist.findAll()
            .then(data => {
                dataPlaylist = data
                return Song.findAll()
            })
            .then(data => {
                dataSong = data
                res.render('addSongtoPlaylist', { dataSong, dataPlaylist })
            })
            .catch(err => res.send(err))
    }
    static postSongtoPlaylist(req, res) {
        let UserId = req.session.userId
        const { name, SongId } = req.body
        Playlist.create({ name, SongId, UserId })
            .then(data => {
                res.redirect('/user/playlist')
            })
            .catch(err => res.send(err))
    }
    static getEditUser(req, res) {
        let UserId = req.session.userId
        User.findByPk(UserId)
            .then(data => {
                res.render('editUser', {data})
            })
            .catch(err => res.send(err))
    }
    static postEditUser(req,res){
        const{name, age, email, password} = req.body
        User.update({name, age, email, password}, {
            where: {
                id: req.params.id
            }
        })
        .then(data => res.redirect('/user'))
        .catch(err => res.send(data))
    }
}

module.exports = Controller