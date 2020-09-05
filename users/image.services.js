const { promisify } = require('util');
const fs = require('fs');
const mv = promisify(fs.rename);
const path = require('path')
var dir = './uploaded/';

module.exports = {
    uploadImage,
    getImage,
    getAll
};

const images = [{id: 0, image_name: 'test.png', user: 'example@email.com', date: Date()}]

async function getAll() {
    return images.map(image => {
        // I don't want to expose the user email
        const { user , ...imageWihtoutEmail } = image
        return imageWihtoutEmail
    })
}

async function uploadImage(userId, files) {
    let newFile = null

    if (!fs.existsSync(dir)){
        console.log(dir + " doesn't exist, creating one.")
        fs.mkdirSync(dir);
    }

    try {
        if (!files) {
            return { status: 500, message: 'No file uploaded' }
        } else {
            newFile = files.image;
            console.log(newFile)
            const path = dir + newFile.name;
            console.log(path)

            console.log("Saving file.")
            let data = await saveFile(userId, newFile.name, newFile.tempFilePath, path);
            return data;
        }
    } catch (err) {
        console.log(err)
        throw "Something went wrong";
    }
}

async function saveFile(userId, filename, oldPath, newPath) {
    let image_data = {
        id: images.length,
        user: userId,
        image_name: filename,
        date: new Date()
    }

    const moveItem = async () => {
        await mv(oldPath, newPath)
    };

    return moveItem().then(() => { return image_data })
}

async function getImage(id) {
    const image = images.find(image => image.id === id);

    if (image) {
        return dir + image.image_name;
    } else {
        throw 'Image does not exist'
    }
}