# Image Server REST
A simple image server that uses REST APIs to register/login user

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1182px-Node.js_logo_2015.svg.png" width="50%">
</p>

# APIs

| API                   | Type | Body                                                     | Access  | Description                                                                                                            |
|:-----------------------:|:------:|:----------------------------------------------------------:|:---------:|------------------------------------------------------------------------------------------------------------------------|
| `/login`              | POST | `{ "email": "login_email", "password": "login_password" }` | PUBLIC  | Logs the user and returns the user object with a JSON WebToken that the user has to use to make requests to other APIs |
| `/register`           | POST | `{ "email": "login_email", "password": "login_password" }` | PUBLIC  | Registers a new user                                                                                                   |
| `/users`              | GET  | -                                                        | PRIVATE | Returns every registered user                                                                                          |
| `/images`             | GET  | -                                                        | PRIVATE | Returns every stored image data                                                                                        |
| `/users/:userId`      | GET  | -                                                        | PRIVATE | Returns user data with id `userId`                                                                                     |
| `/images/:imageId`    | GET  | -                                                        | PRIVATE | Returns image with id `imageId`                                                                                        |
| `/images/uploadImage` | POST | `{ "image" : file }`                                                        | PRIVATE | Uploads image to the server                                                                                            |

## Team Members
- Mattia Righetti
- Nicolò Felicioni
- Luca Conterio

# Backend

## How to start the server
Navigate to cloned repository

`npm install` to install the required dependencies

`npm test` for **nodemon** process intended for development process

`npm start` for **production**