# Spring Boot with React - Movies forum

## Table of contents
* [About project](#about-project)
* [Technologies](#technologies)
* [Used dependencies](#used-dependencies)
* [Database structure](#database-structure)
* [Endpoints and queries](#endpoints-and-queries)
* [Overview](#overview)

## About project
...

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
            "$ref": "<users_collection>", 
            "$id": "<ObjectId>"
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
        "$ref": "<collection>", 
        "$id": "<ObjectId>" 
    },
    "date": "<date>"
}
```
#### gridfs
[mongoDB documentation](https://docs.mongodb.com/manual/core/gridfs/)

## Endpoints and queries
| Method | Endpoint  | Action | mongoDB query | 
| --- |:-----:|:-----:|:-----:|
|GET|api/movie/list|return list of all movies|db.movies.find()|
|GET|api/movie/mostCommented|return limited list of 4 movies with the most comments|db.movies.find().sort({comments: -1}).limit(1)|
|GET|api/movie/topRated|return limited list of 4 movies with the highest average rates|db.movies.aggregate([{ $project: { avg: { $avg: "$rates.rate"} } }, { $sort: { avg:-1 }}, { $limit:4 }])|
|GET|api/movie/list/{category}|return list of movies by category|db.movies.find({ "category":"<some_category>" })|
|GET|api/movie/get/{id}|return movie by id|db.movies.find({ _id:ObjectId("60abcbab3809ac0bc0debe4c") })|
|POST|api/auth/register|user registration|db.users.insertOne({email:"<some_email>", password:"<hashed_password>", roles:"USER", verificationCode:"<64_characters_long_random_string>", enabled:false})|
|POST|api/auth/login|user login|db.users.findOne({ "email":"<some_email>" })|
|GET|api/auth/verify|user's email verification to enable his account|db.users.update({ verificationCode:"<64_characters_long_random_string>" }, { $unset: {verificationCode:1}, $set: { enabled: true }})|
|GET|api/auth/resend/{email}|resend email with verification link to a given user's email||
|PATCH|api/user/movie/rate/{id}|add or change user's rate to a specific movie (1 per movie)|db.users.findOne({ "email":"some_email" })|
|POST|api/user/movie/comment/{id}|add user's comment to a specific movie|db.comment.insertOne({content:"comment", user: new DBRef('users','<user_id>'), date:'2021-05-28 21:42:40'}) / db.movies.update({ _id:ObjectId("<movie_id>") }, { $push: { comments: new DBRef('comment','<comment_id>') }})|
|POST|api/admin/add|add new movie|db.movies.insertOne({title:"title", description:"description", directors:["director"], url:"url", category:"category", rates:[{}], comments:[{}], actors:[{name:"name",second_name:"second_name",role:"role"}]})|
|DELETE|api/admin/delete/{id}|delete existing movie and any of it's files|db.movies.insertOne({title:"title", description:"description", directors:["director"], url:"url", category:"category", rates:[{}], comments:[{}], actors:[{name:"name",second_name:"second_name",role:"role"}]})|
|PATCH|api/admin/editMovie/{id}|edit existing movie|db.movies.updateOne({_id:ObjectId("<id>")}, {$set: {<field>:"<value>"}})|

## Overview
...