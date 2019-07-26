const web3 = require('web3');
const Tx = require('ethereumjs-tx')


web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/98e55de05f2c43f1acb2e53c678ee4a6"));


var ether_transfer = async function(_publicAddress)
{
     
    var myAddress = "0x604Ebb9a4986947b2c9D1a517Be883f2539DaB1d";
    var privateKey = Buffer.from("F79943DACBBA187E3B5ABDD0A9B1B9164C266F9DE42427174E23A2323A17A81F", 'hex')


    count= web3js.eth.getTransactionCount(myAddress)
    console.log("Count: "+count);
         
        var amount = web3js.toHex(1e16);

        try {
            var rawTransaction = {"from":myAddress, "gasPrice":web3js.toHex(20* 1e9),"gasLimit":web3js.toHex(990000),"to":_publicAddress,"value":web3js.toHex(100000000000000000),"data":"","nonce":web3js.toHex(count)}
            console.log(rawTransaction);           
        } catch (error) {
            console.log(error)
        }
        var transaction = new Tx(rawTransaction);

        transaction.sign(privateKey);

        try {
            var txHash=web3js.eth.sendRawTransaction('0x'+transaction.serialize().toString('hex'));
             console.log("Transaction Hash",txHash)

            while(true)
            {
                if(web3js.eth.getTransactionReceipt(txHash)!=null)
                {
                    console.log(web3js.eth.getTransactionReceipt(txHash))
                    return txHash;
                }
            }
                         
        } catch (error) {
            console.log(error)
            return error;
        }                
    


}
exports.ether_transfer=ether_transfer