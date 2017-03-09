'use strict';

var taskValidation = function(){

    this.isTaskFound = function (getWorkflowResponseBody, taskType, callback) {
        for (let i in getWorkflowResponseBody.tasks) {
            if (getWorkflowResponseBody.tasks[i].taskType === taskType) {
                return callback(true);
            }
        }
        return callback(false);
    };

    this.isTaskCompleted = function (getWorkflowResponseBody, taskType, callback) {
        for (let i in getWorkflowResponseBody.tasks) {
            if (getWorkflowResponseBody.tasks[i].taskType === taskType) {
                if (getWorkflowResponseBody.tasks[i].status === 'Complete') {
                    return callback(true);
                }

            }
        }
        return callback(false);
    };

    this.isTaskWaitingToBeProcessed = function (getWorkflowResponseBody, taskType, callback) {
        for (let i in getWorkflowResponseBody.tasks) {
            if (getWorkflowResponseBody.tasks[i].taskType === taskType) {
                if (getWorkflowResponseBody.tasks[i].status === 'WaitingToBeProcessed') {
                    return callback(true);
                }

            }
        }
        return callback(false);
    };
};

module.exports = taskValidation;