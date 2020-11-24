const app = require("./app.js");
const fetch = require("node-fetch");
const url = "http://localhost:8000/api/v1/birre"


describe('birre.test', () => {

    let server;

    beforeAll( () => {
        const port = process.env.PORT || 8000;

        return new Promise( (resolve, reject) => {
            server = app.listen(port, resolve());
            console.log(`Server listening on port ${port}`);
        });

    });

    afterAll( (done) => {
        console.log(`Closing server`);
        server.close( done() );
    });

    it('works with get', async () => {
        expect.assertions(1)
        var response = await fetch(url)
        expect(response.status).toEqual(200)
    });

    it('works with put', async () => {
        expect.assertions(1)
        var response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({id:6, name: 'PolloAlSas'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        expect(response.status).toEqual(201)
    });

    it('works with post', async () => {
        expect.assertions(1)
        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({id:1, name: 'SassinoSassoso'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        expect(response.status).toEqual(201)
    });
    
});