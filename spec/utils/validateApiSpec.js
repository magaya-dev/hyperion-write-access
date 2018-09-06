const isValid = require('../../lib/utils/validateApi');

describe ('Api validation', function () {
    it ('should pass when necessary methods exist', function () {
        const testApi = {
            saveAsync: () => true,
            editAsync: () => true,
        };

        expect(isValid(testApi)).toBe(true);
    });

    it ('should fail when at least one necessary method is missing', function () {
        const testApi = {
            saveAsync: () => true
        };

        expect(isValid(testApi)).toBe(false);
    });
});