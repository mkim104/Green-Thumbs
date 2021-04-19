var mongoose = require('mongoose');

var organizationSchema = mongoose.Schema({
    name: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    sector: { type: String },
    website: { type: String },
    image: { type: String, default: 'grey.jpeg' },
    employees: [{
        employeeId: { type: String, default: '' },
        employeeFullname: { type: String, default: '' },
        employeeRole: { type: String, default: '' }
    }],

    organizationRating: [{
        organizationName: { type: String, default: '' },
        userFullname: { type: String, default: '' },
        userRole: { type: String, default: '' },
        organizationImage: { type: String, default: '' },
        userRating: { type: Number, default: 0 },
        userReview: { type: String, default: '' }
    }],

    ratingNumber: [Number],
    ratingSum: { type: Number, default: 0 }
});

module.exports = mongoose.model('Organization', organizationSchema);