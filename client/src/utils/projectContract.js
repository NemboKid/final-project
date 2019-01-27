import getWeb3 from "./utils/getWeb3";
import React, { Component } from "react";


class ContractCreator extends Component {

  state = {
    web3: null,
    accounts: null,
    contract: null,
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
      console.log(instance);
      //console.log(instance.events.LogStepCount.toString());

      this.setState({
        createDev: { devAddress: this.state.devAddressInit
      }});

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample1);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

      runExample1 = async () => {

      const { accounts, contract } = this.state;
      //const numberOfDevs = this.test;

      const contractActive = await contract.methods.contractActive().call();

      const addressInList = await contract.methods.developersList(4).call();

      const creatorAddress = await contract.methods.creator().call();

      // Stores a given value, 5 by default.
      //await
      //contract.methods.addDeveloper(devAddr, reward).send({ from: accounts[0] });
      //contract.methods.numberOfDevs().send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      //const response = await contract.methods.contractActive().call({ from: accounts[0] });
      const response = await contract.methods.numberOfDevs().call();
      //const accountz = await getWeb3.eth.getAccounts();

    };
  }


export ContractCreator;
