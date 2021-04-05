var Organization = require('../models/organization');
var async = require('async');

module.exports = (app) => {
    app.get('/review/:id', (req, res) => {
        var success_msg = req.flash('success');
        Organization.findOne({ '_id': req.params.id }, (err, data) => {
            res.render('organization/review', { title: 'Organization Reviews', user: req.user, data: data, msg: success_msg, hasMsg: success_msg.length > 0 });
        })
    });

    app.post('/review/:id', (req, res) => {
        async.waterfall([
            function (callback) {
                Organization.findOne({ '_id': req.params.id }, (err, result) => {
                    callback(err, result);
                })
            },

            function (result, callback) {
                Organization.updateOne({
                    '_id': req.params.id
                },
                    {
                        $push: {
                            organizationRating: {
                                organizationName: req.body.sender,
                                userFullname: req.user.fullname,
                                userRole: req.user.role,
                                organizationImage: req.user.organization.image,
                                userRating: req.body.clickedValue,
                                userReview: req.body.review
                            },
                            ratingNumber: req.body.clickedValue
                        },
                        // increment the sum by the clicked value
                        $inc: { ratingSum: req.body.clickedValue }
                    }, (err) => {
                        req.flash('success', 'Your review / rating has been successfully submitted.');
                        res.redirect('/review/' + req.params.id);
                    })
            }
        ])
    });
}