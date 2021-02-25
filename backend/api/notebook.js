module.exports = app => {
    const { existsOrError } = app.api.util

    const add = (req, res) => {
        const notebook = {
            name: req.body.name,
            icon: req.body.icon,
            id_user: req.user.id
        }
        
        try {
            existsOrError(notebook.name, 'Nome não informado')

            app.db('notebook')
                .insert(notebook)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const edit = (req, res) => {
        const notebook = {
            id: req.params.id,
            name: req.body.name,
            icon: req.body.icon,
            id_user: req.user.id
        }

        try {
            existsOrError(notebook.name, 'Nome não informado')
    
            app.db('notebook')
                .update(notebook)
                .where({id: notebook.id, id_user: notebook.id_user})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        } catch(msg) {
            res.status(400).send(msg)
        }
        
    }

    const remove = async (req, res) => {
        try {
            const notebook = await app.db('notebook')
                .where({id: req.params.id, id_user: req.user.id }).first()
            
            try {
                existsOrError(notebook, 'Caderno não encontrado')

                await app.db('register')
                    .where({id_notebook: notebook.id}).del()

                await app.db('notebook')
                    .where({id: notebook.id, id_user: req.user.id }).del()

            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const notebookLimit = 7
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('notebook').count('id').first()
        const count = parseInt(result.count)

        await app.db.select('notebook.id', 'notebook.name', 'notebook.icon')
            .from('notebook')
            .where({ id_user: req.user.id })
            .orderBy('id', 'asc')
            .limit(notebookLimit).offset(page * notebookLimit - notebookLimit)
            .then(notebooks => res.json({ notebooks: notebooks, count, limit: notebookLimit }))
            .catch(err => res.status(500).send(err))
    }

    const registerLimit = 15
    const getById = async (req, res) => {

        const notebook = await app.db.select('notebook.id', 'notebook.name', 'notebook.icon')
            .from('notebook')
            .where({ id: req.params.id, id_user: req.user.id }).first()

        if(notebook) {
            const page = req.query.page || 1
            
            const result = await app.db('register').count('id').first()
            const count = parseInt(result.count)

            await app.db.select('register.id', 'register.title')
                .from('register')
                .where({ id_notebook: notebook.id })
                .orderBy('id', 'desc')
                .limit(registerLimit).offset(page * registerLimit - registerLimit)
                .then(registers => res.json({ notebook, registers , count, limit: registerLimit }))
                .catch(err => res.status(500).send(err))
        } else {
            res.status(401).send('Não autorizado')
        }

    }

    const getByName = (req, res) => {
        const name = req.query.name

        app.db.raw(`SELECT notebook.id, notebook.name, notebook.icon
            FROM notebook INNER JOIN public.user ON notebook.id_user = public.user.id
            WHERE (lower(unaccent(notebook.name)) like lower(unaccent('%${name}%'))) 
            AND
            public.user.id = ${req.user.id}`)

            .then(result => {
                res.json({notebooks: result.rows})
            })
            .catch(err => res.status(500).send(err))
    }

    return {add, edit, remove, get, getById, getByName}
}