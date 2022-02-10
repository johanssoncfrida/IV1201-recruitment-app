# IV1201-recruitment-app
This is the project for the course IV1201 at KTH. It's a web application in JavaScript for a recruitment system.

## Installation
- If you do not already have node.js install it.
- Clone this git repository.
- Install all required npm packages by running the command `npm install` in both the `backend` directory and the `frontend`directory.
- Create a new database in postgres. Install the following script in your database: https://canvas.kth.se/courses/31599/files/4988825?wrap=1

## Running the application
1. Make a copy the file `.env.example` and create your own `.env` file where you will specify your settings. 
2. Start you database. 
3. Start the server by running the command `npx nodemon src/server.js` in the `backend`directory.
4. Start the client by running the command `npm start` in the `frontend` directory.
5. Open http://localhost:3000 to view the client in the browser.