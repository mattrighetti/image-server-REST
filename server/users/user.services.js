const config = require('config.json');
const jwt = require('jsonwebtoken');

// Database non required
const users = [{ id: 0, email: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
const images = [];

module.exports = {
    authenticate,
    getAll,
    registerUser,
    uploadImage
};

async function authenticate({ email, password }) {
    // Searches user in users variable
    const user = users.find(u => u.email === email && u.password === password);
    // If it's found
    if (user) {
        // Sign user with token
        // The sign method generates a WEBTOKEN that has to be delivered to the user
        // In this case the token will expire in 5 hours
        // If the user wants to stay signed-in we'll save the token on the localStorage, otherwise we have to save it in the sessionStorage
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: (60 * 60 * 5) });
        // Code below is the same as doing
        // const password = user.password
        // const userWithoutPassword = { id: user.id, username: user.username, firstname: user.firstName, lastName: user.lastName }
        // Does the same as above `DESTRUCTURING OPERATOR`
        // Takes out password and reconstructs the object + the token
        const { password, ...userWithoutPassword } = user;
        const user_data = { ...userWithoutPassword, token }
        console.log(user_data);
        return user_data;
    }
}

async function registerUser({ email, password }) {
    const user = users.find(u => u.email === email);
    
    if (user) {
        throw "Username has already been taken.";
    }

    const newUser = { id: users.length + 1, email: email, password: password, firstName: email.slice('@'), lastName: ""};
    users.push(newUser);

    console.log(newUser)

    return newUser;
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
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
                    user: 1,
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