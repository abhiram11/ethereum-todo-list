
// Connect Browser to Blockchain -> MetaMask
// Connect Client side application to the Blockchain -> Web3.js


App = {
    load: async () => {
        // load app...
        console.log("App loading.....!!!!")
        await App.loadWeb3() // CONNECT TO BLOCKCHAIN
    },

    loadWeb3: async() => {
        if (typeof web3 !== 'undefined'){
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask..!!")
        }

        //talk to blockchain by metamask extension with web3.js. the configuration that they suggest is:
        window.addEventListener('load', async () => {

            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);

                try {
                    // Request account access if needed
                    await ethereum.enable();

                    // Accounts now exposed
                    web3.eth.sendTransaction({/* ... */});
                } catch (error) {
                    // User denied account access...
                }

            }

            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);

                // Accounts always exposed
            web3.eth.sendTransaction({/* ... */});
            }

            // Non-dapp browsers...
            else{
                console.log('Non-Ethereum browser detected. You should consider MetaMask!!')
            }
        }); 


    }
}

//load the app whenever the project loads..
$(() => {
    $(window).load(() => {
        App.load()
    })

})
