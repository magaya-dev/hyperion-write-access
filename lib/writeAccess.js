/**
 * Write access module for hyperion.
 * @module hyperion-write-access
 */

class WriteAccess {
    constructor (operation) {
        this.operation = operation;
    }

    op (obj) {
        return Promise((accept, reject) => {
            this.operation(obj, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    accept(result);
                }
            });
        });
    }
};

/**
 * Write access object, used for updating hyperion objects.
 * @typedef {Object} WriteAccess
 * @property {Function} save - Saves an object in the database. Must be called on interface object.
 * @property {Function} edit - Creates an interface object from a database object. Must be called on database object.
 */

/**
 * Constructor function for hyperion write access object.
 * @param {Object} asyncApi - Hyperion async api object. Should have write methods.
 * @returns {WriteAccess} Write access object.
 */
module.exports = function (asyncApi) {
    var edit = new WriteAccess(asyncApi.editAsync);
    var save = new WriteAccess(asyncApi.saveAsync);

    this.save = obj => edit.op(obj);
    this.edit = obj => save.op(obj);
};