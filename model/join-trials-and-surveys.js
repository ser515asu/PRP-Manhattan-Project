'use strict';

/**
 * @module model/join-trials-and-surveys
 */

/**
 * This joins the Trial table and SurveyTemplate table
 * @typedef {Object} JoinTrailsAndSurveys
 */

/**
 * Registers model with Sequelize
 * @param {Sequelize} sequelize - database instance
 * @returns {Null} nothing
 */
function register (sequelize) {
    sequelize.define(
        'join_trials_and_surveys',
        {},
        {
            paranoid: true
        }
    );
}

module.exports = register;
