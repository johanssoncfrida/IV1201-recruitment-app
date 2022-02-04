'use strict'

const SignUpApi = require('./SignUpApi');

/**
 * This class contains all request handlers and support
 * for loading them.
 */
class RequestHandlerLoader {

    /**
     * Creates a new instance of the loader.
     */
    constructor() {
        this.requestHandlers = [];
    }

    /**
     * Will add a new requesthandler to the list.
     * @param {RequestHandler} requestHandler The handler that shall be added
     */
    addRequestHandler(requestHandler) {
        this.requestHandlers.push(requestHandler);
    }

    /**
     * 
     * @param {Application} app The express app that will hold all handlers.
     */
    loadRequestHandlers(app) {
        this.requestHandlers.forEach((requestHandler) => {
            requestHandler.registerHandler();
            app.use(requestHandler.path, requestHandler.router);
        })
    }
}

/**
 * Create the loader and load all handlers.
 */
const loader = new RequestHandlerLoader();
loader.addRequestHandler(new SignUpApi());
module.exports = loader;