'use strict';

/**
 * @module controller/handler/trial
 */

const database = require('../../model');
const processPatient = require('../helper/process-patient');
const processTrial = require('../helper/process-trial');
const moment = require('moment');
const processComplianceCount = require('../helper/process-compliance-count');

/**
 * A dashboard with an overview of a specific trial.
 * @function trial
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {View} Rendered page
 */
function trialView (request, reply) {
    const trial = database.sequelize.model('trial');
    const stage = database.sequelize.model('stage');
    const startDate = moment().startOf('Week');

    Promise
        .all([
            trial.findById(request.params.id),
            stage.findAll({
                where: {
                    trialId: request.params.id
                }
            }),
            database.sequelize.query(
                `
            SELECT *, st.name AS stage
            FROM trial AS tr
            JOIN stage AS st
            ON st.trialId = tr.id
            JOIN patient AS pa
            ON pa.stageId = st.id
            WHERE tr.id = ?
            `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id
                    ]
                }
            ),
            database.sequelize.query(
              `
              SELECT pa.id,
              SUM(si.state = 'expired') AS expiredCount,
              SUM(si.state = 'completed') AS completedCount
              FROM survey_instance AS si
              JOIN patient AS pa
              ON pa.id = si.patientId
              JOIN stage AS st
              ON st.id = pa.stageId
              WHERE st.trialId = ?
              AND si.endTime > ?
              GROUP BY pa.id
                `,
                {
                    type: database.sequelize.QueryTypes.SELECT,
                    replacements: [
                        request.params.id,
                        startDate.toISOString()
                    ]
                }
            )
        ])
        .then((data) => {
            const currentTrial = data[0];
            const stages = data[1];
            const patients = data[2];
            const compliance = data[3];
            const complianceCount = processComplianceCount(compliance);
            const patientCount = complianceCount[0] + complianceCount[1] + complianceCount[2];

            reply.view('trial', {
                title: 'Pain Reporting Portal',
                trial: processTrial(currentTrial),
                stages,
                patients: patients.map(processPatient),
                complianceCount,
                patientCount,
                graphData: JSON.stringify({
                    datasets: complianceCount,
                    labels: [
                        'Compliant',
                        'Semicompliant',
                        'Noncompliant'
                    ]
                })
            });
        })
        .catch((err) => {
            console.error(err);
            reply.view('404', {
                title: 'Not Found'
            });
        });
}

module.exports = trialView;
