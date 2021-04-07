var formidable = require('formidable');
var path = require('path');
var async = require('async');
var fs = require('fs');
var Organization = require('../models/organization');
var User = require('../models/user');
var { arrayAverage } = require('../functions');

module.exports = (app) => {
    app.get('/organization/create', (req, res) => {
        var success = req.flash('success');
        res.render('organization/organization', { title: 'Organization Registration', user: req.user, success: success, noErrors: success.length > 0 });
    });

    app.post('/organization/create', (req, res) => {
        var newOrganization = new Organization();
        newOrganization.name = req.body.name;
        newOrganization.address = req.body.address;
        newOrganization.city = req.body.city;
        newOrganization.country = req.body.country;
        newOrganization.sector = req.body.sector;
        newOrganization.website = req.body.website;
        newOrganization.image = req.body.upload;

        newOrganization.save((err) => {
            if (err) {
                console.log(err);
            }

            console.log(newOrganization);

            req.flash('success', 'Organization has been successfully registered.');
            res.redirect('/organization/create')
        })
    });

    app.post('/upload', (req, res) => {
        var form = new formidable.IncomingForm();

        // where we save uploaded files; the uploads directory needs to be refreshed to see the uploaded files
        form.uploadDir = path.join(__dirname, '../public/uploads');

        form.on('file', (field, file) => {
            fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                if (err) {
                    throw err;
                }

                console.log('File renamed');
            });
        });

        form.on('error', (err) => {
            console.log('An error occurred', err);
        });

        form.on('end', () => {
            console.log('File uploaded successfully');
        });

        // parses an incoming Node.js request containing form data
        form.parse(req);
    });

    app.get('/organizations', (req, res) => {
        Organization.find({}, (err, result) => {
            console.log(result)
            res.render('organization/organizations', { title: 'All Organizations', user: req.user, data: result });
        });
    });

    app.get('/organization-profile/:id', (req, res) => {
        Organization.findOne({ '_id': req.params.id }, (err, data) => {
            var average = arrayAverage(data.ratingNumber);
            res.render('organization/organization-profile', { title: 'Organization Profile', user: req.user, id: req.params.id, data: data, average: average });
        });
    });

    app.get('/organization/register-employee/:id', (req, res) => {
        Organization.findOne({ '_id': req.params.id }, (err, data) => {
            res.render('organization/register-employee', { title: "Register Employee", user: req.user, data: data });
        });
    });

    app.get('/organization/search', (req, res) => {
        res.render('organization/search', {title: 'Find a Company', user:req.user});
    });
    
    app.post('/organization/search', (req, res) => {
        var name = req.body.search;
        var regex = new RegExp(name, 'i');
        
        Organization.find({'$or': [{'name':regex}]}, (err, data) => {

            try {
                res.redirect('/organization-profile/'+data[0]._id);
            }
            catch(err) {
                console.log(err);
            }
            
        });
    });

    app.post('/organization/register-employee/:id', (req, res, next) => {
        async.parallel([
            function (callback) {
                Organization.update({
                    '_id': req.params.id,
                    // not equal
                    'employees.employeeId': { $ne: req.user._id }
                },
                    {
                        $push: { employees: { employeeId: req.user._id, employeeFullname: req.user.fullname, employeeRole: req.body.role } }
                    },
                    (err, count) => {
                        if (err) {
                            return next(err);
                        }
                        callback(err, count);
                    }
                );
            },

            function (callback) {
                async.waterfall([
                    function (callback) {
                        Organization.findOne({ '_id': req.params.id }, (err, data) => {
                            callback(err, data);
                        })
                    },
                    function (data, callback) {
                        User.findOne({ '_id': req.user._id }, (err, result) => {
                            result.role = req.body.role;
                            result.company.name = data.name;
                            result.company.image = data.image;

                            result.save((err) => {
                                res.redirect('/home');
                            })

                        })
                    }
                ]);
            }
        ])
    })

};