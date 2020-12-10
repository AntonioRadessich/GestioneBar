const app = require("./app.js");
const fetch = require("node-fetch");
const url = "http://localhost:8000/api/v1"

describe ('app.test', () => {

    let server;
    let token="AJHDSOA302J1AD7SH234H7ASPMXCJZHC7832042OUA0A";
    beforeAll( () => {
        const port = process.env.PORT || 8000;

        return new Promise( (resolve, reject) => {
            server = app.listen(port, resolve());
            console.log("Server listening on port ${port}");
        });

    });

    afterAll( (done) => {
        console.log("Closing server");
        server.close( done() );
    });

    it("Login Works",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"?email=asd@unitn.com"+"?token="+token);
        expect(response.status).toEqual(200);
    });

});