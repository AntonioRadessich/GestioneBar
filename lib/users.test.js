const app=require("./app.js");
const fetch=require("node-fetch");
const { isMainThread } = require("worker_threads");
const { expect, it } = require("@jest/globals");
const { unionTypeAnnotation } = require("@babel/types");
const url="http://localhost:8000/api/v1/users";

describe('users.test',()=>{
    let server;
    let token="AJHDSOA302J1AD7SH234H7ASPMXCJZHC7832042OUA0A";
    beforeAll(()=>{
        const port=process.env.PORT || 8000;
        return new Promise((resolve,reject)=>{
            server=app.listen(port,resolve());
            console.log("server listening on port ${port}");
        });
    });

    afterAll((done)=>{
        console.log("closing server");
        server.close(done());
    });

    it("get di tutti gli utenti",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"?token="+token);
        expect(response.status).toEqual(200);
    });

    it("get di un utente",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/1?token="+token);
        expect(response.status).toEqual(200);
    });

    it("works with put",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/1?token="+token,{
            method: 'PUT',
            body: JSON.stringify({id:1,email:"asd@unitn.com",category:"manager"}),
            headers: {"Content-Type":"application/json"}
        });
        expect(response.status).toEqual(201);
    });

    it("works with post",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"?token="+token,{
            method:'POST',
            body:JSON.stringify({email:"testmail@unitn.com",category:"barista"}),
            headers:{"Content-Type":"application/json"}
        });
        expect(response.status).toEqual(201);
    });

    it("works with delete",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/12?token="+token,{
            method:'DELETE'
        });
        expect(response.status).toEqual(200);
    });
});