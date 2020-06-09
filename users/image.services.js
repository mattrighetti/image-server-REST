module.exports = {
    uploadImage,
    getImage,
    getAll
};

const images = [{id: 0, image_name: 'test.png', user: 'example@email.com'}]

async function getAll() {
    return images.map(image => {
        // I don't want to expose the user email
        const { user , ...imageWihtoutEmail } = image
        return imageWihtoutEmail
    })
}

async function uploadImage(userId, files) {
    let newFile = null

    try {
        if (!files) {
            return {
                status: false,
                message: 'No file uploaded'
            }
        } else {
            newFile = files.image;
            const path = __dirname + '/../store/images/' + newFile.name; // Not really good looking

            newFile.mv(path, (error) => {
                if (error) {
                    throw error
                }

                let image_data = {
                    user: userId,
                    image_name: newFile.name,
                    date: new Date()
                }
                
                images.push(image_data);
                return image_data;
            })
        }
    } catch (err) {
        throw "Something went wrong";
    }
}

async function getImage(id) {
    const image = images.find(image => image.id === id);

    if (image) {
        return '../store/images/' + images.image_name;
    } else {
        throw 'Image does not exist'
    }
}