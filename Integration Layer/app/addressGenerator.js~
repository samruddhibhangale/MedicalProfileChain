const web3 = require('web3');
const Tx = require('ethereumjs-tx')
const wallet = require('ethereumjs-wallet');
const ether_tr=require("./ether_transfer")



web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/98e55de05f2c43f1acb2e53c678ee4a6"));


var addressGenerator = async function()
{
    const myWallet = wallet.generate();

    var address=myWallet.getAddressString();
    var privateAddress=myWallet.getPrivateKeyString();

    console.log("Public-Private Key Success");
    console.log("Public Address", address);
    console.log("Private Key", privateAddress);

    // count= web3js.eth.getTransactionCount(myAddress)
    // console.log("Count: "+count);
         
    return ether_tr.ether_transfer(address).then(function(result){
        return JSON.stringify({ 'Address': address, 'PrivateKey': privateAddress} );
    })
        



}
exports.addressGenerator=addressGenerator
