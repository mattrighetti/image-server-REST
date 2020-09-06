const config = require('config.json');
const path = require('path')
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router()
const imageService = require('./image.services')

module.exports = router;

router.get("/", function (req, res, next) {
    // I need the token to get the user data
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    jwt.verify(token[1], config.secret);
    imageService.getAll()
        .then(images => res.json(images))
        .catch(err => res.json(err));
});

// API to upload the image
router.post("/uploadImage", function (req, res, next) {
    // I need the token to get the user data
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], config.secret);
    console.log(decoded)
    imageService.uploadImage(decoded.sub, req.files)
        .then(data => { res.json(data) })
        .catch(err => res.json(err));
});

router.get("/search", function (req, res, next) {
    let queryUserId = req.body.user
    imageService.getImagesOfUserWithId(queryUserId)
        .then((images) => res.json(images))
        .catch(err => res.json({ message: err }))
});

router.get("/:imageId", function (req, res, next) {
    let imageId = parseInt(req.params.imageId)

    var options = {
        root: path.join(__dirname, '../'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

    imageService.getImage(imageId)
        .then(image => {
            res.sendFile(image, options, (err) => {
                if (err) {
                    res.status(500).json({ message : "Server was unable to retrieve the image." });
                }
            })
        })
        .catch(err => res.status(400).json({ message : err }));
});