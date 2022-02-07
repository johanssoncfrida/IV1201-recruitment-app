'use strict';

const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const Person = require('../model/Person');
const PersonDTO = require('../model/PersonDTO');

/**
 * RecruitmentDAO class is responsible for all database calls.
 * 
 */
class RecruitmentDAO {

    /**
     * Constructor of RecruitmentDAO
     * Setup the connection to the database.
     */
    constructor() {
        const namespace = cls.createNamespace('recruitment_db');
        Sequelize.useCLS(namespace);
        this.database = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            {host: process.env.DB_HOST, dialect: process.env.DB_DIALECT},
            
        );
        console.log("Successfully created db instance and connected to db.");
        Person.createModel(this.database);
    }

    /**
     * The database object
     * 
     * @return {Object} The sequelize transaction manager.
     */
    getTransactionManager() {
        return this.database;
    }

    /**
     * Finds a person in the database by calling Sequelize's method findByPk()
     * and passing the parameter id.
     * This method is not currently in use.
     * 
     * @param {Integer} id 
     * @returns {PersonDTO} The found person or null if not found.
     */
    async findPersonById(id) {
        try {
            const personModel = await Person.findByPk(id);
            if (personModel === null) {
                return null;
            }
            return this.createPersonDTO(personModel);
        } catch(err) {
            console.log("Error in findPersonById");
        }
    }

    /**
     * Creates a person in the database by passing the parameter personDTO
     * to Sequelize's method create().
     * 
     * @param {PersonDTO} personDTO 
     * @returns {PersonDTO} The created person
     */
    async createPerson(personDTO) {
        try {
            const person = await Person.create(personDTO);
            return this.createPersonDTO(person);
        } catch(err) {
            console.log("Error in createPerson");
        }
    }

    /**
     * Creates a PersonDTO
     * 
     * @param {Person} personModel 
     * @returns {PersonDTO} The created person
     */
    createPersonDTO(personModel) {
        return new PersonDTO(
            personModel.person_id,
            personModel.name,
            personModel.surname,
            personModel.pnr,
            personModel.email,
            personModel.password,
            personModel.roleId,
            personModel.username,
        );
    }
}

module.exports = RecruitmentDAO;