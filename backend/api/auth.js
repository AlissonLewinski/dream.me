const authSecret = process.env.AUTH_SECRET || require('../.env').AUTH_SECRET
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.username || !req.body.password) {
            return res.status(400).send('Informe nome de usuário e senha')
        }

        const user = await app.db('user')
            .where({username: req.body.username})
            .first()

        if(!user) {
            return res.status(400).send('Usuário não encontrado')
        }

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) {
            return res.status(401).send('Nome de usuário ou senha inválidos')
        }

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            username: user.username,
            iat: now,
            exp: now + (60 * 60 * 24 * 15)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            console.log(e)
        }

        res.send(false)
    }

    return { signin, validateToken }
}