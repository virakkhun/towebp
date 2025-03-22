/**
 * @typedef {Object} WorkerState
 * @prop {0} INITIAL_DEP
 * @prop {1} STARTED
 * @prop {2} DONE
 * @prop {3} ERROR
 **/

/**
 * @typedef {Object} WorkerInput
 * @prop {File} file
 * @prop {number} quality
 * @prop {WorkerState} state
 **/

/**
 * @typedef {Object} Result
 * @prop {string} url
 * @prop {number} size
 * @prop {string} originalFileName
 * @prop {string} error
 **/

/**
 * @typedef {Object} WorkerOutput
 * @prop {Result} result
 * @prop {WorkerState} state
 **/
