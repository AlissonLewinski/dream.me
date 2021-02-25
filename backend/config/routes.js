module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    //Notebooks
    app.route('/notebooks')
        .all(app.config.passport.authenticate())
        .get(app.api.notebook.get)
        .post(app.api.notebook.add)

    app.route('/notebooks/byName')
        .all(app.config.passport.authenticate())
        .get(app.api.notebook.getByName)

    app.route('/notebooks/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.notebook.getById)
        .put(app.api.notebook.edit)
        .delete(app.api.notebook.remove)

    //Registers
    app.route('/registers/')
        .all(app.config.passport.authenticate())
        .post(app.api.register.add)
    
    app.route('/registers/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.register.getById)
        .put(app.api.register.edit)
        .delete(app.api.register.remove)
}