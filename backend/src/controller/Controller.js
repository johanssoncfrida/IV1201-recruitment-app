'use strict';

class Controller {
    /**
     * Creates an instance.
     */
    constructor() {
        // Shall connect to database by creating a DAO-object
    }

    /**
     * Creates the controller.
     * 
     * @returns {Controller} The controller.
     */
    static async createController() {
        const contr = new Controller();
        return contr;
    }

    /**
     * This is just a small test function to see that the controller
     * could be called. 
     * 
     * @returns {String} A dummy message.
     */
    testControllerCall() {
        return 'Should make something meaningful eventually';
    }

    /**
     * This is by now only returning the username of the user. Eventually
     * it should add the user to the database using the DAO-object.
     * @param {User} user The user to add.
     * @returns Information about the user, bu now only the username.
     */
    addUser(user) {
        return user.username;
    }
}

module.exports = Controller;