var express = require('express');
var router = express.Router();
var web3 = require('../modules/web3modules/web3connect');


//import abi
var abi = require('../contracts/abi.js');
console.log(abi);


//var myContract = web3.eth.contract(abi);
//var myContract = contractAbi.at('0x3B913cAd6149909f7137879b3467e1b414Ea5DF9');
// suppose you want to call a function named myFunction of myContract
//var getData = myContract.myFunction.getData(function parameters);
//finally paas this data parameter to send Transaction

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){
  // Now we automatically get the story in the request object
  // We use story ID to create a new element for that story
  var fromadd = req.body.from
  var amtEth = req.body.amt
  //res.send('hi' + add);

  //promise
//const waitFor = () => new Promise(web3.eth.sendTransaction({to:'0x3B913cAd6149909f7137879b3467e1b414Ea5DF9', from:fromadd, value:web3.toWei(1, "ether")}));
//new async loop
/*
async function ethSendTransaction() {
        await waitFor();
}
*/

web3.eth.sendTransaction({to:'0x3B913cAd6149909f7137879b3467e1b414Ea5DF9', from:fromadd, value:web3.toWei(amtEth, "ether")})
  //getting balance from ganache for testing
  var fBal = web3.eth.getBalance(fromadd);
  var fromBal = fBal/1000000000000000000
  //var toBal = web3.eth.getBalance(toadd);
  //console.log(balance.toNumber());

  var tokenInst = web3.eth.contract(abi).at('0x3B913cAd6149909f7137879b3467e1b414Ea5DF9');
  var tkfBal = tokenInst.balanceOf.call(fromadd)
  //divide by 20 zeros
  var tokenBal = tkfBal/100000000000000000000
  res.render('tx', { fBal: fromBal, fAdd: fromadd, fAmt: amtEth, tkBal: tokenBal });
}); 

module.exports = router;
