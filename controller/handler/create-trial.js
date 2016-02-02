'use strict';

/**
 * @module controller/handler/create-trial
 */

const boom = require('boom');
const database = require('../../model');

/**
 * Creates a new Trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} Redirect
 */
function createTrial (request, reply) {
    const trial = database.sequelize.model('trial');

    trial
    .create(request.payload)
    .then((newTrial) => {
        reply.redirect(`/trial/${newTrial.id}`);
    })
    .catch((err) => {
        console.error(err);
        reply(boom.badRequest('Invalid Trial'));
    });
}

module.exports = createTrial;
