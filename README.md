# Image Server REST
A simple image server that uses REST APIs to register/login user

|![Logo](https://grokonez.com/wp-content/uploads/2018/12/vue.js-nodejs-restapi-sequelize-mysql-feature-image.png)|
|:--:|

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