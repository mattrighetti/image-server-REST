const express = require('express');
const router = express.Router()
const userService = require('./user.services')

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

    let file = null

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            })
        } else {
            file = req.files.file;
            const path = __dirname + '/other/images/' + file.name;

            file.mv(path, (error) => {
                if (error) {

                    console.error(error);

                    res.writeHead(500, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify({
                        status: 'error',
                        message: error
                    }))

                    return;
                }

                let image_data = {
                    user: "TODO",
                    image_name: file.name,
                    date: new Date()
                }
        
                knex('images').insert(image_data).then((res) => {
                    
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })

                    res.end(JSON.stringify({
                        status: 'success',
                        path: '/images/' + file.name
                    }))

                }).catch((error) => {
                    res.json({
                        success: false,
                        message: 'Something went wrong'
                    })
                })

            })
        }

    } catch (err) {
        res.status(500).send(err)
    }
});