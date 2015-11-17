'use strict';

const Joi = require('joi');

const checkSurveys = require('./handler/check-surveys');
const getSurvey = require('./handler/get-survey');
const submitSurvey = require('./handler/submit-survey');

module.exports = [
    {
        method: 'GET',
        path: '/api/check_surveys',
        handler: checkSurveys,
        config: {
            validate: {
                query: {
                    userPIN: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/get_survey',
        handler: getSurvey,
        config: {
            validate: {
                query: {
                    surveyInstanceID: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/submit_survey',
        handler: submitSurvey,
        config: {
            validate: {
                query: {
                    surveyInstanceID: Joi.number().integer()
                },
                payload: {
                    surveyInstanceID: Joi.number().integer(),
                    timeStamp: Joi.date(),
                    surveyResults: Joi.array().items(
                        Joi.object().keys({
                            quesID: Joi.number().integer(),
                            selectedOptions: Joi.array().items(
                                Joi.number().integer().empty('')
                            ),
                            bodyPain: Joi.array().items(
                                Joi.object().keys({
                                    location: Joi.string().empty(''),
                                    intensity: Joi.number().integer().empty('')
                                })
                            )
                        })
                    )
                }
            }
        }
    }
];
