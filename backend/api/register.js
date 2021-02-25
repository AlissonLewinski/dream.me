const notebook = require("./notebook")

module.exports = app => {
    const { existsOrError } = app.api.util

    const add = async (req, res) => {
        const register = {
            title: req.body.title,
            content: req.body.content,
            id_notebook: req.body.id_notebook
        }
        
        try {
            existsOrError(register.title, 'Título não informado')
            existsOrError(register.content, 'Conteúdo não informado')
            existsOrError(register.id_notebook, 'Caderno não informado')
    
            const notebook = await app.db.select('notebook.id')
                .from('notebook')
                .where({ 'notebook.id': register.id_notebook, 'notebook.id_user': req.user.id }).first()
            
            if(notebook) {
                app.db('register')
                    .insert(register)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
    
            } else {
                res.status(401).send('Unauthorized')
            }
        } 
        catch(msg) {
            res.status(400).send(msg)
        }
    }

    const edit = async (req, res) => {
        const register = {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content
        }
        
        try {
            existsOrError(register.title, 'Título não informado')
            existsOrError(register.content, 'Conteúdo não informado')

            const notebook = await app.db.select('notebook.id')
                .from('notebook')
                .innerJoin('register', {'notebook.id': 'register.id_notebook'})
                .innerJoin('user', {'notebook.id_user': 'user.id'})
                .where({ 'notebook.id_user': req.user.id, 'register.id': register.id }).first()

            if(notebook) {
                app.db('register')
                    .update(register)
                    .where({id: register.id})
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))

            } else {
                res.status(401).send('Unauthorized')
            }
        }
        catch(msg) {
            res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        const notebook = await app.db.select('notebook.id')
            .from('notebook')
            .innerJoin('register', {'notebook.id': 'register.id_notebook'})
            .innerJoin('user', {'notebook.id_user': 'user.id'})
            .where({ 'notebook.id_user': req.user.id, 'register.id': req.params.id }).first()
            
        if(notebook) {
            await app.db('register')
                    .where({id_notebook: notebook.id}).del()
        
        } else {
            return res.status(401).send('Unauthorized')
        }
        
        res.status(204).send()
    }

    const getById = async (req, res) => {
        const register = await app.db.select('register.id', 'register.title', 'register.content', 'register.id_notebook')
            .from('register')
            .innerJoin('notebook', {'register.id_notebook': 'notebook.id'})
            .innerJoin('user', {'notebook.id_user': 'user.id'})
            .where({ 'user.id': req.user.id, 'register.id': req.params.id }).first()

        if(register) {
            const notebook = await app.db.select('notebook.id', 'notebook.name')
                .from('notebook')
                .innerJoin('register', {'register.id_notebook': 'notebook.id'})
                .first() 
            
            if(notebook) {
                res.json({register, notebook})
            } else {
                res.status(500).send()
            }

        } else {
            res.status(401).send('Não autorizado')
        }
    }


    return {add, edit, remove, getById}
}