# Image Server REST
A simple image server that uses REST APIs to register/login user and lets him/her upload images to it.

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1182px-Node.js_logo_2015.svg.png" width="50%">
</p>

# APIs

**Register user**
----
   Returns json data about the registered user.

* **URL**

  /register

* **Scope**

  `PUBLIC`

* **Method:**

  `POST`
  
* **URL Params**

   None

* **Data Params**

  `email: String` <br />
  `password: String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id": 1,
      "email": "some_name@mail.com",
      "password": "some_password",
      "firstName": "some_name",
      "lastName": "some_last_name"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Username has already been taken." }`

* **Sample Call:**

  ```bash
    curl --location --request POST 'localhost/register' \
    --form 'email=EMAIL' \
    --form 'password=PASSWORD'
  ```
  
**Login user**
----
   Returns json data about the logged user, without password and with a **webtoken**.

* **URL**

  /login
  
* **Scope**

  `PUBLIC`

* **Method:**

  `POST`
  
* **URL Params**

   None

* **Data Params**

  `email: String` <br />
  `password: String`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "id": 1,
        "email": "a",
        "firstName": "a",
        "lastName": "",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU5OTMxOTcyMCwiZXhwIjoxNTk5MzM3NzIwfQ.jlvpehyhoAFaeQFde_W80NwbTZktuSaK7emqUyVdDT8"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Username or password is incorrect" }`

* **Sample Call:**

  ```bash
  curl --location --request POST 'localhost/login' \
  --form 'email=EMAIL' \
  --form 'password=PASSWORD'
  ```

**Get all images**
----
   Returns json data about the all the images stored.

* **URL**

  /images
  
* **Scope**

  `PRIVATE`

* **Method:**

  `GET`
  
* **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {"id":0,"image_name":"test.png","date":"Sat Sep 01 1963 17:25:58 GMT+0200 (Central European Summer Time)"},
      ...
      {"id":1231,"image_name":"file.png","date":"Sat Sep 02 1963 17:25:58 GMT+0200 (Central European Summer Time)"}
    ]
    ```

* **Sample Call:**

  ```bash
  curl --location --request GET 'localhost/images'
  ```
  
**Get all users**
----
   Returns json data about the all the users stored.

* **URL**

  /users

* **Scope**

  `PRIVATE`

* **Method:**

  `GET`
  
* **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {"id":0,"email":"test","firstName":"Test","lastName":"User"},
      ...
      {"id":1213,"email":"abc","firstName":"abc","lastName":"abc"}
    ]
    ```

* **Sample Call:**

  ```bash
  curl --location --request GET 'localhost/users'
  ```

**Upload image**
----
   Returns json data about the uploaded image.

* **URL**

  /images/uploadImage
  
* **Scope**

  `PRIVATE`

* **Method:**

  `POST`
  
* **URL Params**

   None

* **Form Params**

   `image: File`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "id":1121,
      "user":4941,
      "image_name":"_g0p7akqke - image.png",
      "date":"2020-09-05T15:35:53.073Z"
    }
    ```

* **Sample Call:**

  ```bash
  curl --location --request POST 'localhost/images/uploadImage' \
  --header 'Authorization: Bearer webtoken' \
  --form 'image=@/Users/example/folder/image.png'
  ```
  
**Get image**
----
   Returns specified image if present.

* **URL**

  /images/:imageId

* **Scope**

  `PRIVATE`

* **Method:**

  `POST`
  
* **URL Params**

   `imageId: int`

* **Form Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    Image

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Image does not exist" }`
    
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message": "Server was unable to retrieve the image." }`

* **Sample Call:**

  ```bash
  curl --location --request GET 'localhost/images/1123' \
  --header 'Authorization: Bearer webtoken'
  ```
  
**Get images of user**
----
   Returns json data about every image that a specified user has uploaded.

* **URL**

  /images/search

* **Scope**

  `PRIVATE`

* **Method:**

  `POST`
  
* **URL Params**

   None

* **Form Params**

   `user: int`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {"id":0, "image_name":"test.png", "user":1, "date":"Sat Sep 05 2020 17:42:14 GMT+0200 (Central European Summer Time)"},
      ...
      {"id":1, "user":1, "image_name":"_4wljyxeuj - image.png", "date":"2020-09-05T15:45:49.985Z"}
    ]
    ```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "No image of ${user} were found" }`

* **Sample Call:**

  ```bash
  curl --location --request GET 'localhost/images/search' \
  --header 'Authorization: Bearer webtoken' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'user=111111'
  ```

# Backend

## How to start the server
Navigate to cloned repository

`npm install` to install the required dependencies

`npm test` for **nodemon** process intended for development process

`npm start` for **production**
