'use strict';

const RecruitmentDAO = require('../integration/RecruitmentDAO');
const PersonDTO = require('../model/PersonDTO');

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
        return this.transactionManager.transaction(async (t) => {
            return await this.recruitmentDAO.createPerson(person);
        });
    }

    /**
     * Finds a person in the database by calling RecruitmentDAO and passing the parameter id
     * This method is not currently in use.
     * 
     * @param {Integer} id 
     * @returns {PersonDTO} The found person
     */
    async findPerson(id) {
        return this.transactionManager.transaction(async (t) => {
            return await this.recruitmentDAO.findPersonById(id);
        });
    }
}

module.exports = Controller;