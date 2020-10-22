const express = require('express')
const Controller = require('./controller/controller')
const app = express()
const PORT = 3000
const routes = require('./routes/routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'huahaha',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use(routes)

app.listen(PORT, () => {
    console.log(`LISTENING TO PORT ${PORT}`);
})