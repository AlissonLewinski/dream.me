const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.util

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.username, 'Nome de usuário não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const userFromDB = await app.db('user')
                .where({ username: user.username }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Nome de usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('user')
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('user')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    return {save}
}