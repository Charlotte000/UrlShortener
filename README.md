# UrlShortener

Bitly like  url shortener using JavaScript, Node js, Express and MongoDB.

## Usage
Open the main page and enter your URL in the input. The given url is the shorter variant. 
Using it you will be redirected to the specified link

---
## Installation of Dependencies
First you need to install **Node.js** application.  
Then using **npm** you should run command in the working directory:
```
npm install
```
This will install **_express_**, **_express-handlebars_**, **_mongodb_** modules.  
Initially, **localhost:8000** is used, but when you upload it to the server, you should change **localhost**.  

## Settings  
This application uses MongoDB database. So you need to registate account on [MongoDB Atlas site](https://www.mongodb.com/cloud/atlas).
We should use _Atlas_ version of Cloud MongoDB for remote control so we don't have to collect all data locally.
After that you should enter your user login and password information in **settings.js** file.  
Initially, **/admin** url is open for debugging. This thing is not so important so you can remove it if you want.

## Application Start
We should run the following command to start the server:
```
node main
```
