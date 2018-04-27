# ManageUs

## It's a helpful web app for people living together.
Brief Description: People in a household are able to leaves notes for each other, collaborate on a grocery list, assign chores, create polls and more.

### Features Include:
- Collaborated Grocery List
- Chores List
- Leave Notes for Each Other
- Rules List
- Polls

### Pages:
- Register
- Login
- Join Household OR Start household
- Main Page / Dashboard
- Account Page (Upload Picture, Change Name, Leave Household)

### Members:
- Devin Sova - dsova@purdue.edu
- Christopher Cooper - coope157@purdue.edu
- Yufei Xu - xu881@purdue.edu

### Technologies Used:
- Node.js
- Front End: React JS, create-react-app, Bootstrap
- Back End: Express, Sequelize, MariaDB

## How to use

### Development

- Copy `.env.sample` to `.env` and change `DEV_MYSQL_STRING` to a connection string to your development MySQL database.
- Update npm packages with `yarn install`.
- Create database tables by running `yarn sequelize db:migrate`.
- Run the server with `yarn start`.

### Production

- Do the same steps as development above (but don't run the server).
- Make sure `PROD_MYSQL_STRING` in `.env` is the connection string to your *production* database.
- Run `yarn build` to build minified static assets.
- Run `NODE_ENV=PRODUCTION EXPRESS_PORT=80 node server.js` to run the server.
  - Note that you may need to run this as root if you choose a port number less than 1024 (such as 80).
