import HelloWorld from './HelloWorld'

describe('::HelloWorld test does nothing', () => {

    it('::name is HelloWorld', function () {
        expect(HelloWorld.name).toBe('HelloWorld');
    });
});