class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  constructor(props) {
    super(props);

    this.state = {
      devAddresses: []
    }

    this.handleClick = this.handleClick.bind(this);
  }


  //test = { numberOfDevs: null };
  //testing = web3.eth.Contract(PlatformzNew.abi);
  handleClick (){
    if (this.addressInput !== null) {
      this.setState({
        devAddresses: this.state.devAddresses.concat(this.addressInput.value)
      });
    }
  }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PlatformzNew.networks[networkId];
      const instance = new web3.eth.Contract(
        PlatformzNew.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    //ReactDOM.findDOMNode(this.addressInput).focus();
  };

  /*componentDidUpdate() {
    this.addressInput.value = '';
    ReactDOM.findDOMNode(this.addressInput).focus();
  }*/


  runExample = async () => {
    const { accounts, contract, active, devs } = this.state;
    //const numberOfDevs = this.test;

    //tester
    const devAddress: address = "0xabd56d4460627dc88fcc05382891dd4e7ca26c6e";
    let reward: number = 2;
    let name: string = 'Vanessa';
    let total: number = 50;


    let sentence: string = `My name is ${name}`;
    console.log(sentence);

    // Stores a given value, 5 by default.
    //await
    contract.methods.addDeveloper(devAddress, reward).send({ from: accounts[0] });
    //contract.methods.numberOfDevs().send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.contractActive().call({ from: accounts[0] });
    const response2 = await contract.methods.numberOfDevs().call();

    // Update state with the result.
    this.setState({ accounts: response });
    this.setState({ devs: response2 })
    //this.setState({ web3: response })
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    let addresses2 = this.state.devAddresses.map(address2 => {
      return <li key={address2}>{addresses2}</li>;
    });
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>Active or not: { this.state.active }</div>
        <div>Number of Devs: { this.state.devs }</div>
        <button onClick={ this.numberOfDevs }> How many devs? </button>

      <input
        placeholder="Developer's address"
        onChange={e => this.setState({ developersAddress: e.target.value }) }
        id="#devAddress1"/>

        <input type="text" placeholder="Enter a new name" ref={(ref) =>
          this.addressInput = ref} />

        <button type="button" onClick={ this.handleClick }>Add</button>
          <div>
            <ol>
              <li> {addresses2}</li>
            </ol>
          </div>
        <div>The stored value is: {this.state.accounts}</div>
      </div>
    );
  }
}










***

import React, { Component } from "react";
//import { contractAddr } from "./setup.js";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import PlatformzNew from "./contracts/PlatformzNew.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  constructor(props){
    super(props)
    this.state={web3: null, accounts: null, contract: null, developers: [{ address: accounts[1], weight: 2 }]
    }
    this.numberOfDevs=this.numberOfDevs.bind(this)
  };

    componentDidMount = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PlatformzNew.networks[networkId];
        const instance = new web3.eth.Contract(
          PlatformzNew.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.runExample);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    componentDidUpdate() {
      this.addressInput.value = '';
      ReactDOM.findDOMNode(this.addressInput).focus();
    }


  addDeveloper(developerAddress){
    instance.addDeveloper(developerAddress)
    //let votes=ratingContract.totalVotesFor(movie).toNumber()
    this.setState({developers:this.state.developers})
    };


  render() {
    return <div>
      <input
        placeholder="Email"
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
      />
    </div>
}
}


export default App;
