# GraphQL-Server

I've copied the GraphQL server form this video https://www.youtube.com/watch?v=ZQL7tL2S0oQ as practice to understand how GraphQL works.

Steps:
* set up a basic express server: create a new project and start with npm init. 
* in package.json file, change the main file name to  `"main": "server.js"
* install all the dependencies: `npm i express express-graphql graphql`
* install `npm -i` `--``save-dev nodemon` to allow working locally easier by allowing us to reload our servers whenever we save our files, without having to stop/start the server
* create a script to run our nodemon server in package.json: "devStart": "nodemon server.js" and create a file called server.js
* run the server with **npm run devStart**
* go to http://localhost:5000/graphql
