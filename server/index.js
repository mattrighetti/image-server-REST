const express = require('express')
const bodyParser = require("body-parser");
const fileupload = require('express-fileupload')
const knex = require('knex')
var path = require("path");

const app = express()

let db;
let serverPort = process.env.PORT || 5000;

function initKnex() {
    if (process.env.TEST) {
        db = knex({
            client: "sqlite3",
            debug: false,
            connection: {
                filename: "./other/db/postRepositoryDatabase.db"
            },
            useNullAsDefault: true
        });
    } else {
        db = knex({
            client: "mysql",
            debug: true,
            connection: {
                "host" : process.env.DATABASE_HOST || "127.0.0.1",
                "port" :"3306",
                "user" : "root",
                "password" : "password",
                "database" : "image-server"
            },
            useNullAsDefault: true
        });
    }
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileupload())

// REST APIs
app.post('/register', function (req, res) {
    var date = new Date();

    let newUser = {
        email: req.body.email,
        password: req.body.password,
        date: date
    };

    db('users').insert(newUser).then((res) => {
        res.json({
            success: true,
            message: 'User registered successfully'
        })
    }).catch((error) => {
        res.json({
            success: false,
            message: 'Something went wrong'
        })
    })
})

// API that checks if the user is in the database
app.get('/login', function (req, res, next) {
    let email = req.body.email
    let password = req.body.password

    db('users').select().where('email', email).andWhere('password', password).then(function(user) {
        if(user[0].id) {
          res.cookie('loggedIn', 'true');
          res.cookie('loginDateTime', moment(new Date()).format())
        }
    }).catch((err) => {
        console.log(err)
        
        res.status(401).send(err)
    })

})

// API to upload the image
app.post("/saveImage", async function (req, res) {

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

app.set("port", serverPort);
initKnex();

/* Start the server on port 5000 */
app.listen(serverPort, '0.0.0.0', function () {
    console.log(`Your app is ready at port ${serverPort}`);
});