const app = require("./app.js");
const fetch = require("node-fetch");
const url = "http://localhost:8000/api/v1/birre"


describe('birre.test', () => {

    let server;
    let token="AJHDSOA302J1AD7SH234H7ASPMXCJZHC7832042OUA0A";
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
        var response = await fetch(url+"?token="+token)
        expect(response.status).toEqual(200)
    });

    it('works with put', async () => {
        expect.assertions(1)
        var response = await fetch(url+"?token="+token, {
            method: 'PUT',
            body: JSON.stringify({id: 5,
                name: "a",
                img: "a",
                infoGenerali:{
                    produttore: "a",
                    distributore: "ass",
                    gradazioneAlcolica: 1,
                    tempoDiFermentazione: 1,
                    gusto: "a",
                    calorie: "a",
                    colore: "a",
                },
                ingredienti:"a"
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        expect(response.status).toEqual(201)
    });

    it('works with post', async () => {
        expect.assertions(1)
        var response = await fetch(url+"?token="+token, {
            method: 'POST',
            body: JSON.stringify({
                name: "ad",
                img: "a",
                infoGenerali:{
                    produttore: "a",
                    distributore: "a",
                    gradazioneAlcolica: 1,
                    tempoDiFermentazione: 1,
                    gusto: "a",
                    calorie: "a",
                    colore: "a",
                },
                ingredienti:"a"
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        expect(response.status).toEqual(201)
    });
    
    it('search by name works with get', async () =>{
        expect.assertions(1)
        var response = await fetch(url+"/nome/Forst"+"?token="+token)
        expect(response.status).toEqual(200)
    });

    it('closest match search works with get', async () =>{
        expect.assertions(1)
        var response = await fetch(url+"/nome/closestMatch/r"+"?token="+token)
        expect(response.status).toEqual(200)
    });

});