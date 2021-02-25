const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const enforce = require('express-sslify')

app.db = db

app.use(enforce.HTTPS({ trustProtoHeader: true }))

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/util.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(process.env.PORT, () => {
    console.log('Backend executando...')
})