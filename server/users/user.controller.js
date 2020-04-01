const express = require('express');
const router = express.Router()
const userService = require('./user.services')
const config = require('config.json');
const jwt = require('jsonwebtoken')

module.exports = router;


// REST APIs
router.post('/register', function (req, res) {
    userService.registerUser(req.body)
        .then(u => res.json(u))
        .catch(err => res.json(err));
})

// API that checks if the user is in the database
router.post('/login', function (req, res, next) {
    userService.authenticate(req.body)
        // If user is returned then login was successfull, return the token along with user data (WITHOUT PASSWORD)
        .then(userWithToken => userWithToken ? res.json(userWithToken) : res.status(400).json({ message: 'Username or password is incorrect' }))
        // Else run next `CALLBACK` (which is going to be a passed function)
        .catch((err) => {
            console.log(err);
            next(err)
        });
})

router.get('/getAll', function (req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
})

// API to upload the image
router.post("/saveImage", async function (req, res, next) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], config.secret);
    userService.uploadImage(decoded.id, req.files)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});