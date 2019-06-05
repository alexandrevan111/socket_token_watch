module.exports = function(app, http) {
     var Web3 = require('web3')
     
     /* Web3 Initialization */
     const { WebsocketProvider } = Web3.providers
     const provider = new WebsocketProvider(app.web3.provider)
     
     var web3 = new Web3(provider); // Using Infura

     /* Contract initialization */
     var newContractObj = new web3.eth.Contract(app.contract.new.abi, app.contract.new.address)
     newContractObj.options.from = app.contract.new.owner_address
     
     var oldContractObj = new web3.eth.Contract(app.contract.old.abi, app.contract.old.address)
     oldContractObj.options.from = app.contract.old.owner_address

     var io = require('socket.io')(http)
     var axios = require('axios')

     /* App Start */
     var fromBlock = 7893378
     //fromBlock = 5593533
     
     io.on('connection', function(socket){
          var hashLatest = ''
          var listenPast = () => {
               newContractObj.getPastEvents('Transfer', {
                    fromBlock
               }, (error, events) => { 
                    if(!error && events) {
                         let hash = events[events.length - 1].transactionHash
                         let blockNumber = events[events.length - 1].blockNumber

                         fromBlock = blockNumber

                         if(hashLatest != hash) {
                              hashLatest = hash

                              /* Get TX */    
                              axios.get('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xd7cd762f3ebc2c9a3d9bcf0133e06d04c59a1f7d&page=1&offset=10&sort=desc&apikey=XSVX53ZD5XU5HARZSZ3Y7SBDGATK93Q98C')
                              .then((res) => {
                                   if(res && res.data && res.data.result && res.data.result.length > 0) {
                                        let items = res.data.result

                                        io.emit('event', {items})
                                   }

                                   setTimeout(() => {
                                        listenPast()
                                   }, 2000)
                              })
                              .catch((error) => {
                                   setTimeout(() => {
                                        listenPast()
                                   }, 2000)
                              })
                              /* Get TX End */
                         }
                    } else {
                         setTimeout(() => {
                              listenPast()
                         }, 2000)
                    }
               })
          }

          listenPast()

          /*var listenTX = () => {
               newContractObj.events.Transfer({
                    fromBlock: 'latest'
               })
               .once('data', (log) => {
                    let { returnValues: { from, to, tokens }, blockNumber, transactionHash } = log
                    
                    console.log(transactionHash)
                    //fromBlock = blockNumber + 1
                    listenTX()
               })
               .once('changed', (log) => {
                    console.log(log)
                    listenTX()
               })
               .once('error', (log) => {
                    console.log(log)
                    listenTX()
               })
          }

          listenTX()*/
     })
     /* App End */
}