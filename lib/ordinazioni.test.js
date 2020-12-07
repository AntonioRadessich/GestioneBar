const app = require("./app.js");
const fetch = require("node-fetch");
const url = "http://localhost:8000/api/v1/ordinazioni"


describe('ordinazioni.test', () => {

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
            body: JSON.stringify({
                id:9,
                user: 'Giannis',
                table: 2,
                finished: false,
                listOfOrders: [
                    {
                        beer: "Forst",
                        quantity: "0.5"
                    },
                    {
                        beer: "Heineken",
                        quantity: "0.3"
                    }
                ]
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        expect(response.status).toEqual(201)
    });

});