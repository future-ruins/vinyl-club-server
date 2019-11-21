# Vinyl Club - App Server

## About this project

Vinyl Club is a self-initiated project built in 2 days for practice purposes. The idea was to build a simple app that allows local registered users / record collectors to exchange vinyl records from their collections.

- **[Related repos: Vinyl Club App Client]()** Coming soon / work in progress! </br>
  App UI: users can sign-up and login, post records they wish to exchange, post comments on a record, message other users for exchange purposes.

## Table of contents:

- **[How to install](#how-to-install)**
- **[Technologies used](#technologies-used)**
- **[Endpoints](#endpoints)**

## How to install

1. Clone the git repository:

`git@github.com:future-ruins/vinyl-club-server.git`

2. In your terminal, run the following commands:

`npm install`

3. To start the terminal with nodemon, use the following command (this assumes nodemon is installed globally)

`nodemon index.js`

4. To start the code without tracking saved changes, you can simply run:

`node index`

As a standard we are using port 4000 for this server.

5. Checkout the **[Client ReadMe]()** to install and run the client.

TESTING:
Dmmy data will automatically be added to your database, if you are currently running nodemon with the command mentioned above, nodemon index. Otherwise, you can simply run node index in your terminal.

## Technologies used

- PostgreSQL
- Sequelize
- Express
- JWT

For an overview of missing features check: **[Issues](https://github.com/zegenerative/asteroid-apocalypse-server/projects/1)**

## Endpoints
