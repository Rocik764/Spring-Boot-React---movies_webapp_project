# Spring Boot with React - Movies forum

## Table of contents
* [About project](#about-project)
* [Technologies](#technologies)
* [Used dependencies](#used-dependencies)
* [Database structure](#database-structure)
* [Endpoints and queries](#endpoints-and-queries)
* [Application overview](#overview)

## About project
It's my first fullstack project using mongodb database together with Spring Boot. As a frontend, I've used React and Bootstrap.
The project is a forum for users where they can comment and rate different movies added by administrators. Users have to register and confirm email, 
I've used JavaMailSender interface provided by Spring starter module to send confirmation email. 
After successful registration users are able to post comments and rate from 1 to 5 under specific movie.<br/>
In the table under Endpoint and queries section, I included example queries that could be used to perform actions executed by Spring.

## Technologies
* Spring Boot
* Bootstrap 5
* React
* Redux
* API
* REST
* JWT
* Java 11
* JavaScript
* mongoDB
* HTML & CSS

## Used dependencies
* spring-boot-starter-web
* spring-boot-starter-security
* spring-boot-starter-validation
* spring-boot-starter-mail
* spring-boot-starter-data-mongodb
* jjwt
* jaxb-api
* byte-buddy
* org.projectlombok
* com.google.code.gson

## Database structure
#### user
```json
{ 
    "_id": "<ObjectId>",
    "email": "<string>",
    "password": "<bcrypt>",
    "roles": "<string>"
}
```
#### movie
```json
{ 
    "_id": "<ObjectId>",
    "title": "<string>",
    "description": "<string>",
    "directors": [
        "<string>", 
        "<string>"
    ],
    "url": "<string>",
    "category": "<string>",
    "rates": [
        {
            "rate": "<int>",
            "user": {
                "$ref": "<users_collection>", 
                "$id": "<ObjectId>"
            }
        }
    ],
    "comments": [
        { 
            "$ref": "<comments_collection>", 
            "$id": "<ObjectId>" 
        }
    ],
    "actors": [
        { 
            "name": "<string>", 
            "second_name": "<string>", 
            "role": "<string>" 
        }
    ]
}
```
#### comment
```json
{ 
    "_id": "<ObjectId>",
    "content": "<string>",
    "user": { 
        "$ref": "<users_collection>", 
        "$id": "<ObjectId>" 
    },
    "date": "<date>"
}
```
#### gridfs
[mongoDB documentation](https://docs.mongodb.com/manual/core/gridfs/)

## Endpoints and queries
| Method | Endpoint  | Action | mongoDB query | 
| --- |:---:|:---:|:-----:|
|GET|api/movie/list|return list of all movies|db.movies.find()|
|GET|api/movie/mostCommented|return limited list of 4 movies with the most comments|db.movies.aggregate([{ "$project" : { "comments" : { "$size" : ["$comments"] }}}, { "$sort" : { "comments" : -1 }}, { "$limit" : 4 }])|
|GET|api/movie/topRated|return limited list of 4 movies with the highest average rate|db.movies.aggregate([{ $project: { avg: { $avg: "$rates.rate" }}}, { $sort: { avg:-1 }}, { $limit:4 }])|
|GET|api/movie/list/{category}|return list of movies by category|db.movies.find({ "category":"<value>" })|
|GET|api/movie/get/{id}|return movie by id|db.movies.find({ _id:ObjectId("<id>") })|
|POST|api/auth/register|user registration|db.users.insertOne({ email:"<value>", password:"<hashed_value>", roles:"USER", verificationCode:"<64_characters_long_random_string>", enabled:false })|
|POST|api/auth/login|user login|db.users.findOne({ "email":"<value>" })|
|GET|api/auth/verify|user's email verification to enable his account|db.users.update({ verificationCode:"<64_characters_long_random_string>" }, { $unset: { verificationCode:1 }, $set: { enabled: true }})|
|GET|api/auth/resend/{email}|resend email with verification link to a given user's email||
|PATCH|api/user/movie/rate/{id}|add or change user's rate to a specific movie (1 per movie)|db.movies.updateOne({ _id:ObjectId("<id>") }, { $push: { rates: { rate:<value>, user: new DBRef('users','<id>') }}})|
|POST|api/user/movie/comment/{id}|add user's comment to a specific movie|db.comment.insertOne({ content:"<value>", user: new DBRef('users','<id>'), date:'<value>' }) / db.movies.update({ _id:ObjectId("<id>") }, { $push: { comments: new DBRef('comment','<id>') }})|
|POST|api/admin/movies/add|add new movie|db.movies.insertOne({ title:"<value>", description:"<value>", directors:["<value>"], url:"<url_with_id_to_gridfs_file>", category:"<value>", rates:[{}], comments:[{}], actors:[{ name:"<value>", second_name:"<value>", role:"<value>" }]})|
|DELETE|api/admin/movies/delete/{id}|delete existing movie and any of it's files|db.test_users.deleteOne({ "_id":ObjectId("<id>") })|
|PATCH|api/admin/movies/editMovie/{id}|edit existing movie|db.movies.updateOne({ _id:ObjectId("<id>") }, { $set: { <field>:"<value>" }})|
|GET|api/admin/users/list|return list of all users|db.users.find()|
|PATCH|api/admin/users/editMail/{id}|edit user's mail and disable his account so he has to confirm it again|db.users.updateOne({ _id:ObjectId("<id>") }, { $set: { email:"<value>", enabled: false, verificationCode:"<64_characters_long_random_string>" }})|
|PATCH|api/admin/users/setAdmin/{id}|add ADMIN role to a specific user|db.users.updateOne({ _id:ObjectId("<id>") }, { $set: { role: "USER,ADMIN" }})|
|PATCH|api/admin/users/unsetAdmin/{id}|remove ADMIN role from a specific user|db.users.updateOne({ _id:ObjectId("<id>") }, { $set: { role:"USER" }})|

## Application overview
[![Watch the video](https://user-images.githubusercontent.com/63047043/120210321-ef5c7f00-c22f-11eb-9cd9-696f407a424b.png)](https://youtu.be/T-D1KVIuvjA)
