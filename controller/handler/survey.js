'use strict';

/**
 * @module presenter/survey
 */


const database = require('../../model');

const frequencyOptions = [
    'Never',
    'Almost Never',
    'Sometimes',
    'Often',
    'Almost Always'
];

/**
 * Generates a random pain frequency
 * @returns {String} frequency
 */
function randomFrequency () {
    return frequencyOptions[Math.floor(Math.random() * frequencyOptions.length)];
}

const difficultyOptions = [
    'With no trouble',
    'With a little trouble',
    'With some trouble',
    'With a lot a trouble',
    'Not able to do'
];

/**
 * Generates a random difficulty
 * @returns {String} difficulty
 */
function randomDifficulty () {
    return difficultyOptions[Math.floor(Math.random() * difficultyOptions.length)];
}

const bodyOptions = [
    'Front head',
    'Back head',
    'Front left leg',
    'Back left leg',
    'Front right leg',
    'Back right leg',
    'Front chest',
    'Front abdominal',
    'Back',
    'Lower back',
    'Front left arm',
    'Back left arm',
    'Front right arm',
    'Back right arm',
    'No pain'
];

/**
 * Generates a random body area
 * @returns {String} body area
 */
function randomBodyArea () {
    return bodyOptions[Math.floor(Math.random() * bodyOptions.length)];
}

const survey = {
    id: 1234567,
    type: 'Weekly',
    startTime: '11/15/2015',
    endTime: '11/22/2015',
    userSubmissionTime: '11/16/2015 15:43:35',
    questions: [
        {
            questionText: 'In the past 7 days, I had trouble sleeping when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I had trouble doing schoolwork when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, it was hard for me to pay attention when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, it was hard for me to run when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, it was hard for me to walk one block when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, it was hard to have fun when I had pain.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I could do sports and exercise that others kids my age could do.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could get up from the floor.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could keep up when I played with other kids.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could move my legs.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could stand up by myself.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could stand up on my tiptoes.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I could walk up stairs without holding on to anything.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, I have been physically able to do the activities I enjoy most.',
            questionType: difficultyOptions,
            questionInstance: randomDifficulty()
        },
        {
            questionText: 'In the past 7 days, being tired made it hard for me to play or go out with my friends as much as I\'d like.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I felt weak.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I got tired easily.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, being tired made it hard for me to keep up with my schoolwork.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I had trouble starting things because I was too tired.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I was so tired it was hard for me to pay attention.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I was too tired to do sport or exercise.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I was too tired to do things outside.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I was too tired to enjoy the things I like to do.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I felt nervous.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I felt worried.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I felt like something awful might happen.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I was afraid that I would make mistakes.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I worried about what could happen to me.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'In the past 7 days, I worried when I went to bed at night.',
            questionType: frequencyOptions,
            questionInstance: randomFrequency()
        },
        {
            questionText: 'Please indicate your body pain.',
            questionType: bodyOptions,
            questionInstance: randomBodyArea()
        }
    ]
};

/**
 * A dashboard with an overview of a specific survey.
 * @function survey
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
module.exports = function (request, reply) {
    database.sequelize.query(
        `
        SELECT *
        FROM survey_instance si
        JOIN survey_template st
        ON st.id = si.surveyTemplateId
        JOIN question_instance qi
        ON qi.surveyInstanceId = si.id
        JOIN question_template qt
        ON qt.id = qi.questionTemplateId
        JOIN question_option qo
        ON qo.id = qi.questionOptionId
        WHERE si.id = ?
        `,
        {
            type: database.sequelize.QueryTypes.SELECT,
            replacements: [
                request.params.id
            ]
        }
    )
    .then((result) => {
        // TODO test with seeded survey instance
        console.log(result);

        reply.view('survey', {
            title: 'Pain Reporting Portal',
            patient: {
                id: 1234
            },
            trial: {
                id: 1,
                name: 'test'
            },
            survey: survey,
            surveyJson: JSON.stringify(survey)
        });
    });
};