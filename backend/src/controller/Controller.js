'use strict';

const RecruitmentDAO = require('../integration/RecruitmentDAO');
//const PersonDTO = require('../model/PersonDTO');

/**
 * Controller class. This class is responsible of calling 
 * the model and integration layers.
 * 
 */
class Controller {
    /**
     * Creates an instance.
     */
    constructor() {
        // Shall connect to database by creating a DAO-object
        this.recruitmentDAO = new RecruitmentDAO();
        this.transactionManager = this.recruitmentDAO.getTransactionManager();
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
     * Create a person by calling RecruitmentDao and passing the parameter person.
     * 
     * @param {PersonDTO} person 
     * @returns {PersonDTO} The created person
     */
    async createPerson(person) {
        return this.transactionManager.transaction(async () => {
            return await this.recruitmentDAO.createPerson(person);
        });
    }

    /**
     * Checks if a username is available in the database.
     * 
     * @param {String} username
     * @returns {Boolean} True if username is available or False if username is not available
     */
    async isUsernameAvailable(username) {
        return this.transactionManager.transaction(async () => {
            const person = await this.recruitmentDAO.findPersonByUsername(username);
            if(person) {
                return false;
            }
            return true;
            
        });
    }
}

module.exports = Controller;