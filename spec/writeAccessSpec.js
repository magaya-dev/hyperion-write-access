const WriteAccess = require('../lib/writeAccess');

describe ('Write access wrapper', function () {
    describe ('creation', function () {
        it ('should fail with no api', function () {
            expect(() => new WriteAccess())
                .toThrowError(Error, 'asyncApi is undefined or null');
        });

        it ('should fail with invalid api', function () {
            const testApi = {
                editAsync: () => true
            };

            expect(() => new WriteAccess(testApi))
                .toThrowError(Error, 'invalid asyncyApi provided');
        });

        it ('should create write access with valid api', function () {
            const testApi = {
                editAsync: () => true,
                saveAsync: () => true,
                deleteAsync: () => true,
            };

            const writer = new WriteAccess(testApi);

            expect(writer.save).toBeDefined();
            expect(writer.edit).toBeDefined();
        });
    });

    describe ('operations', function () {
        const successCb = (obj, cb) => {
            expect(obj).not.toBeNull();
            cb(null, 43);
        };

        const failCb = (obj, cb) => {
            expect(obj).not.toBeNull();
            cb(new Error('disaster'), null);
        };

        it ('should save', async function () {
            const api = {
                deleteAsync: () => true,
                editAsync: () => true,
                saveAsync: successCb
            }

            const writer = new WriteAccess(api);

            await expectAsync(writer.save({}))
                .toBeResolvedTo(43);
        });

        it ('should handle save failure', async function () {
            const api = {
                deleteAsync: () => true,
                editAsync: () => true,
                saveAsync: failCb
            }

            const writer = new WriteAccess(api);

            await expectAsync(writer.save({}))
                .toBeRejected();
        });
    
        it ('should edit', async function () {
            const api = {
                deleteAsync: () => true,
                editAsync: successCb,
                saveAsync: () => true
            };

            const writer = new WriteAccess(api);

            await expectAsync(writer.edit({}))
                .toBeResolvedTo(43);
        });

        it ('should handle edit failure', async function () {
            const api = {
                deleteAsync: () => true,
                editAsync: failCb,
                saveAsync: () => true
            }

            const writer = new WriteAccess(api);

            await expectAsync(writer.edit({}))
                .toBeRejected();
        });
    });
});