const config = require('config.json');
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router()
const imageService = require('./image.services')

module.exports = router;

router.get("/", async function (req, res, next) {
    imageService.getAll()
        .then(images => res.json(images))
        .catch(err => res.json(err));
});

// API to upload the image
router.post("/uploadImage", async function (req, res, next) {
    // I need the token to get the user data
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], config.secret);
    imageService.uploadImage(decoded.id, req.files)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.get("/:imageId", async function (req, res, next) {
    let imageId = parseInt(req.params.imageId)
    imageService.getImage(imageId)
        .then(image => res.sendFile(image, (err) => {
            throw err
        }))
        .catch(err => res.json(err));
});