const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/util.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Backend started...')
})