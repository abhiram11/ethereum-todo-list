
// Connect Browser to Blockchain -> MetaMask
// Connect Client side application to the Blockchain -> Web3.js

App = {
    contracts: {},

    load: async () => {
        // load app...
        console.log("App loading.....!!!!")
        await App.loadWeb3() // CONNECT TO BLOCKCHAIN
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async() => {
        if (typeof web3 !== 'undefined'){
            App.web3Provider = web3.currentProvider
            // var contract = require("@truffle/contract");
            web3 = new Web3(web3.currentProvider)
        } else {
            window.alert("Please connect to Metamask..!!")
        }

        //talk to blockchain by metamask extension with web3.js. the configuration that they suggest is:

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
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0] //eth object will hold all accounts, eth created/loaded by web3
        console.log(App.account)
    },

    loadContract: async () => {

        // Create javascript version of smart contract
        const ToDoList = await $.getJSON('ToDoList.json')
        console.log(ToDoList)
        App.contracts.ToDoList = TruffleContract(ToDoList)
        App.contracts.ToDoList.setProvider(App.web3Provider)
        
        App.ToDoList = await App.contracts.ToDoList.deployed()

    },

    render: async () => {

        $('#account').html(App.account)


    }
}

//load the app whenever the project loads..
$(() => {
    $(window).load(() => {
        App.load()
    })

})



/*


// Connect Browser to Blockchain -> MetaMask
// Connect Client side application to the Blockchain -> Web3.js
import detectEthereumProvider from '@metamask/detect-provider';

App = {
    load: async () => {
        // load app...
        console.log("App loading.....!!!!")
        await App.loadWeb3() // CONNECT TO BLOCKCHAIN
        await App.loadAccount()
    },

    loadWeb3: async() => {
        
        const provider = await detectEthereumProvider()

        if (provider){
            App.web3Provider = provider
            web3 = new Web3(provider)
        } else {
            window.alert("Please connect to Metamask..!!")
        }

        //talk to blockchain by metamask extension with web3.js. the configuration that they suggest is:

        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);

            try {
                // Request account access if needed
                await ethereum.enable();

                // Accounts now exposed
                web3.eth.sendTransaction({/* ... --------------/});

            } catch (error) {
                // User denied account access...
            }

        }

        else if (window.web3) {
            window.web3 = new Web3(provider);

            // Accounts always exposed
            web3.eth.sendTransaction({/* ... --------------/});
        }

        // Non-dapp browsers...
        else{
            console.log('Non-Ethereum browser detected. You should consider MetaMask!!')
        }
    },

    loadAccount: async () => {
        App.account = await ethereum.request({ method: 'eth_accounts' })[0] //eth object will hold all accounts, eth created/loaded by web3
        console.log(App.account)
    }
}

//load the app whenever the project loads..
$(() => {
    $(window).load(() => {
        App.load()
    })

})



*/