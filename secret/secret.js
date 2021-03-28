module.exports = {
    auth: {
        user: 'mytestemail@gmail.com',
        pass: 'thisisatest'
    },
    facebook: {
        clientID: '802697830356530',        
        clientSecret: '91a424f82f42e318582bb998f9d3af7c',
        profileFields: ['email', 'displayName'],
        callbackURL: 'http://localhost:8000/auth/facebook/callback',
        passReqToCallback: true
    }
};