# Vinyl Club - App Server

## About this project

Vinyl Club is a project built for practice purposes. The idea was to develop a simple app that allows registered users / record collectors to exchange vinyl records from their collections.

**[Related repos: Vinyl Club App Client]()**
App UI: users can sign-up and login, post records they wish to exchange, post comments on a record, contact other users for exchange purposes.

## Table of contents:

- **[How to install](#how-to-install)**
- **[Technologies used](#technologies-used)**

## How to install

1. Clone the git repository:

`git@github.com:future-ruins/vinyl-club-server.git`

2. In your terminal, run the following command to install dependencies:

`npm install`

3. To run the code with nodemon, type the following command in your terminal (this assumes nodemon is installed globally):

`nodemon index.js`

4. To start the code without tracking saved changes, you can simply run:

`node index.js`

5. Checkout the **[Client ReadMe](https://github.com/future-ruins/vinyl-club-client/blob/master/README.md)** to install and run the client.

6. Testing: As a standard, port 4000 is being used for this server. Dummy data for all models will automatically be added to your database, if you are currently running nodemon with the command mentioned above (`nodemon index`). Otherwise, you can simply run `node index` in your terminal.

## Technologies used

- Node.js
- PostgreSQL
- Sequelize
- Express
- JWT

For an overview of features to be implemented or to be fixed check: **[Issues](https://github.com/future-ruins/vinyl-club-server/issues)**
