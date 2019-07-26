const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var fs = require('fs');
const app = express();
const ether_tr=require("./ether_transfer")


const abiDecoder = require('abi-decoder'); // NodeJS

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/98e55de05f2c43f1acb2e53c678ee4a6"));

var contractFunction = async function(_publicAddress,_privateKey,_contractAddress,operation, args)
{
    try{
        var balance = web3js.eth.getBalance(_publicAddress);

        //creating raw tranaction
        
        if(web3js.fromWei(balance, 'ether')<0.01)
        {
            console.log("Balance less than 0.01")
            return ether_tr.ether_transfer(_publicAddress).then(function(){

                return queryBC(_publicAddress,_privateKey,_contractAddress,contractType,operation, args) 
            })
        }
        else
        {
            console.log("Balance more than 0.01")
            return queryBC(_publicAddress,_privateKey,_contractAddress,operation, args).then(function(res){
            return res;
            })
        }
    } catch (error) {

    console.log(error);
    return "error"
    }
}


async function queryBC(_publicAddress,_privateKey,_contractAddress,operation, args)
{
    try {

        var myAddress = _publicAddress;
        var privateKey = Buffer.from(_privateKey, 'hex')

        
        var contractABI=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_patientId",
                        "type": "uint256"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_email",
                        "type": "string"
                    },
                    {
                        "name": "_patAddress",
                        "type": "string"
                    },
                    {
                        "name": "_contactNo",
                        "type": "uint256"
                    },
                    {
                        "name": "_bloodGroup",
                        "type": "string"
                    },
                    {
                        "name": "_bloodPressure",
                        "type": "uint256"
                    }
                ],
                "name": "push_patient_data",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_doctorId",
                        "type": "uint256"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_email",
                        "type": "string"
                    },
                    {
                        "name": "_docAddress",
                        "type": "string"
                    },
                    {
                        "name": "_contactNo",
                        "type": "uint256"
                    }
                ],
                "name": "push_doctor_data",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_doctorId",
                        "type": "uint256"
                    }
                ],
                "name": "show_doctor_details",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_patientId",
                        "type": "uint256"
                    }
                ],
                "name": "show_patient_details",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_doctorAddress",
                        "type": "address"
                    },
                    {
                        "name": "_patient_id",
                        "type": "uint256"
                    }
                ],
                "name": "give_permission",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];

        var contractAddress =_contractAddress;
        //creating contract object
        var contract = web3js.eth.contract(contractABI).at(_contractAddress);

        var count;
        // get transaction count, later will used as nonce
        count= web3js.eth.getTransactionCount(myAddress)

        console.log("Count: "+count);
                               
        var amount = web3js.toHex(1e16);
        switch(operation)
                    {
                        case "push_doctor_data":
                            var rawTransaction = {"from":myAddress, "gasPrice":web3js.toHex(20* 1e9),"gasLimit":web3js.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.push_doctor_data.getData(args[0],args[1],args[2],args[3],args[4]),"nonce":web3js.toHex(count)}
                            console.log(rawTransaction);
                            break;

                        case "push_patient_data":
                            var rawTransaction = {"from":myAddress, "gasPrice":web3js.toHex(20* 1e9),"gasLimit":web3js.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.push_patient_data.getData(args[0],args[1],args[2],args[3],args[4],args[5],args[6]),"nonce":web3js.toHex(count)}
                            console.log(rawTransaction);
                            break;
                            
                        case "give_permission":
                            var rawTransaction = {"from":myAddress, "gasPrice":web3js.toHex(20* 1e9),"gasLimit":web3js.toHex(990000),"to":contractAddress,"value":"0x0","data":contract.give_permission.getData(args[0],args[1]),"nonce":web3js.toHex(count)}
                            console.log(rawTransaction);
                            break;    
                        
                        case "show_doctor_details":
                            //var newInstance =  web3js.eth.contract(contractABI).at(_contractAddress);
                            console.log("122222222222222222222222222222222222222",args[0])
                            return contract.show_doctor_details.call(args[0],{from:_publicAddress})
                            break;
                        
                        case "show_patient_details":
                            var newInstance =  web3js.eth.contract(contractABI).at(_contractAddress);
                            return newInstance.show_patient_details.call(args[0],{from:_publicAddress})
                            break;    
                                                
                    }

                var transaction = new Tx(rawTransaction);
                transaction.sign(privateKey);
                
            
                        var txHash=web3js.eth.sendRawTransaction('0x'+transaction.serialize().toString('hex'))
                        console.log(txHash);
                        //return JSON.stringify({'transactionHash': txHash});

                        while(true)
                        {
                            if(web3js.eth.getTransactionReceipt(txHash)!=null)
                            {
                                console.log(web3js.eth.getTransactionReceipt(txHash))
                                return txHash;
                                //const decodedLogs = abiDecoder.decodeLogs(web3js.eth.getTransactionReceipt(txHash).logs)
                                //console.log("***************decoded Value***************",decodedLogs);
                                //return decodedLogs;
                            }
                        }

    } catch (error) {
        console.log("catch query",error)
        return error;
    }
}
exports.contractFunction=contractFunction;   