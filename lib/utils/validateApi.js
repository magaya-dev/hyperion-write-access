const mandatoryMethods = [
    'saveAsync',
    'editAsync',
    'deleteAsync'
];

module.exports = asyncApi => 
    mandatoryMethods.every(m => asyncApi[m]);