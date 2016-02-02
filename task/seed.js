'use strict';

/**
 * @module task/seed
 * Adds seed values in the database.
 */

const database = require('../model');
const seedData = require('./helper/seed-data');

database.setup(require('../config.json').database);

Promise
.all([
    database
        .sequelize
        .model('trial')
        .bulkCreate(seedData.trial),
    database
        .sequelize
        .model('question_option')
        .bulkCreate(seedData.questionOption),
    database
        .sequelize
        .model('question_template')
        .bulkCreate(seedData.questionTemplate),
    database
        .sequelize
        .model('survey_template')
        .bulkCreate(seedData.surveyTemplate),
    database
        .sequelize
        .model('stage')
        .bulkCreate(seedData.stage),
    database
        .sequelize
        .model('join_stages_and_surveys')
        .bulkCreate(seedData.joinStagesAndSurveys),
    database
        .sequelize
        .model('join_surveys_and_questions')
        .bulkCreate(seedData.joinSurveysAndQuestions)
])
.then(() => {
    database.sequelize.close();
})
.catch((err) => {
    database.sequelize.close();
    console.error(err);
});
