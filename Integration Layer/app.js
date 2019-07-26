const express = require('express');


var query = require("./app/query.js")
var createAddress = require("./app/addressGenerator.js")

const app = express();
var port=9000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/contractfunction', function (req, res) {
    console.log("---------------------------------Contract Function  API Started---------------------------------",req.body)

    console.log("Request Body--------",req.body);
    var args = req.body.arguments;
    
    //contractFunction(_publicAddress,_privateKey,_contractAddress,contractType,operation, args)
        const result = query.contractFunction(req.body.publicAddress,req.body.privateKey,req.body.contractAddress,req.body.operation,req.body.arguments).then(function(result,error){
           console.log("Result:", result)
           res.send(result)       
            });


    console.log("-------------------------------Contract Function  API END---------------------------------",result)

});

app.get('/createAddr',async function (req, res) {

    console.log("---------Create Address API Started-------");

    const result =await createAddress.addressGenerator();
    res.send(result)

    console.log("---------Create Address API Ended-------",result);


  })


app.listen(port,()=>{
    console.log("*****************************Integration Server started at port",port,"*****************************")
  })