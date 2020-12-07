const app=require("./app.js");
const fetch=require("node-fetch");
const { isMainThread } = require("worker_threads");
const { expect, it } = require("@jest/globals");
const { unionTypeAnnotation } = require("@babel/types");
const url="http://localhost:8000/api/v1/manager/users";

describe('manager.test',()=>{
    let server;

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
        var response=await fetch(url);
        expect(response.status).toEqual(200);
    });

    it("get di un untente",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/1");
        expect(response.status).toEqual(200);
    });

    it("works with put",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/1",{
            method: 'PUT',
            body: JSON.stringify({id:1,email:"asd@unitn.com",category:"manager"}),
            headers: {"Content-Type":"application/json"}
        });
        expect(response.status).toEqual(201);
    });

    it("works with post",async ()=>{
        expect.assertions(1);
        var response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({email:"testmail@unitn.com",category:"barista"}),
            headers:{"Content-Type":"application/json"}
        });
        expect(response.status).toEqual(201);
    });

    it("works with delete",async ()=>{
        expect.assertions(1);
        var response=await fetch(url+"/12",{
            method:'DELETE'
        });
        expect(response.status).toEqual(200);
    });
});