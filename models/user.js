//creating the mongoose schema/database
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    //we wont set this to true as we will use google authentication
    password: { type: String },
    //role of user
    role: { type: String, default: '' },
    organization: {
        name: { type: String, default: '' },
        image: { type: String, default: '' }
    },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpire: { type: Date, default: Date.now },
    facebook: { type: String, default: '' },
    tokens: Array
});

//encrypting password
userSchema.methods.encryptPassword = (password) => {
    //hash it! Set length to 10.
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//export these modules
module.exports = mongoose.model('User', userSchema);