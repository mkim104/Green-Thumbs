module.exports = (app) => {
    app.get('/organization/create', (req,res) => {
        res.render('organization/organization', {user: req.user});
    });
};