# Tasker

A website for organizations, teams, and groups to collaboratively plan out their task schedule.

Built for Purdue CS 348.

## Structure

This project is built with Angular, Node.js, Express, Sequelize, JWT, and MySQL.

## Setup

After installing required node modules, a database connection needs to be established.
This can be done in app/config/db.config.js
You also need to create a secret key for token authorization in app/config/auth.config.js
Finally, after starting the server but before attempting to register an account, you need to populate the "roles" table using the following SQL query:

mysql> INSERT INTO roles VALUES (1, 'user', now(), now());

mysql> INSERT INTO roles VALUES (2, 'moderator', now(), now());

mysql> INSERT INTO roles VALUES (3, 'admin', now(), now());

Once these steps have been completed you should have a functioning build that can be activated by calling "node server.js" for the backend and "ng serve --port 8081" for the front-end.

Access the website at "http://localhost:8081"