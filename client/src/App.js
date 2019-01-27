import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PlatformzNew from "./contracts/WorkingContract.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressInput: '',
      devAddress: [],
      devWeight: [],
      web3: null,
      accounts: null,
      contract: null,
      adminAddress: [],
      adminAddressInput: '',
      contractTime: '',
      contractIsActive: null,
      ownerIs: '',
      dev: '',
      checkDev: '',
      balanceCheck: null,
      step: null,
      contractEnd: null,
      depositSum: null,
      devsNumber: null,
      countStep: null,
      tStep: null,
      infoDev1: null,
      infoDev2: null,
      infoDev3: null,
      infoDev4: '',
      infoDev5: null,
      stepz: null,
      contractSum: '0',
      updatedTime: '',
      timis: '',
      moneySend: '',
      removeDev: '',
      removeAdmin: '',
      devInList: '',
      adminOr: null,
      currentWeight: 0,
      helloOracle: '',
      oracleFee: '1'
    };

    //const Timestamp = require('react-timestamp');
    this.testOracle = this.testOracle.bind(this);
    this.testila = this.testila.bind(this);
    this.deadlineExtend = this.deadlineExtend.bind(this);
    this.showWeight = this.showWeight.bind(this);
    this.removeDev = this.removeDev.bind(this);
    this.startContract = this.startContract.bind(this);
    this.updateContractSum = this.updateContractSum.bind(this);
    this.acceptStep = this.acceptStep.bind(this);
    this.withdrawFromContract = this.withdrawFromContract.bind(this);
    this.continueContract = this.continueContract.bind(this);
    this.killContract = this.killContract.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this);
    this.updateAdminInput = this.updateAdminInput.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.getContractInfo = this.getContractInfo.bind(this);
    this.getDevInfo = this.getDevInfo.bind(this);
    this.updateAddressInput = this.updateAddressInput.bind(this);
    this.updateDevWeight = this.updateDevWeight.bind(this);
    this.createDeveloper = this.createDeveloper.bind(this);
    this.updateContractTime = this.updateContractTime.bind(this);
    this.checkStep = this.checkStep.bind(this);
  }

      componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          //const balances = await web3.eth.getBalance();
          //console.log(balances);

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = PlatformzNew.networks[networkId];
          const instance = new web3.eth.Contract(
            PlatformzNew.abi,
            deployedNetwork && deployedNetwork.address,
          );


          //Check React version if necessary

          //const React = require('react');
          //console.log(React.version);


          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3: web3, accounts: accounts, contract: instance});
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
        return this.checkStep(),
        this.testila()
      };


    async checkStep(e) {
      const contractCall = await this.state.contract.methods;
      const stepCou = await contractCall.stepCount().call();
      return this.setState({
        countStep: stepCou
      })
    }

    updateAddressInput (e) {
      this.setState({
        devAddress: e.target.value,
      });
    }

    updateDevWeight (e) {
      this.setState({
        devWeight: e.target.value,
      });
    }

    createDeveloper (e) {
      const contractCall = this.state.contract.methods;
      const accounts = this.state.accounts;
      const thisManyDevs = contractCall.numberOfDevs().call();

      e.preventDefault();
      this.setState({
        devAddress: [...this.state.devAddress,
          this.state.addressInput,
          this.state.devWeight],
      });

      contractCall.addDeveloper(this.state.devAddress,
        this.state.devWeight)
        .send({ from: accounts[0] });
        console.log(thisManyDevs);

      return this.weightCheck();
      }


      updateAdminInput (e) {
        this.setState({
          adminAddress: e.target.value,
        });
      }

      updateContractSum (e) {
        this.setState({
          contractSum: e.target.value,
        });
      }

      createAdmin (e) {
        const contractCall = this.state.contract.methods;
        const accounts = this.state.accounts;
        //const thisAdmin = contractCall.admins().call();
        e.preventDefault();
        this.setState({
          adminAddress: [...this.state.adminAddress,
            this.state.adminAddressInput],
          adminAddressInput: ''
        });

        contractCall.addAdmin(this.state.adminAddress.toString())
          .send({ from: accounts[0] });
          console.log(this.state.adminAddress);
        }


        async removeAdmin(e) {
          const contractCall = this.state.contract.methods;
          const accounts = this.state.accounts;
          //const thisAdmin = contractCall.admins().call();
          e.preventDefault();

          try {
            await contractCall.removeAdmin(this.state.adminAddress.toString())
            .send({ from: accounts[0] });
          } catch(error) {
            console.log(error);
            console.log(`For some reason, this did not work. Check error message above`);
          }
        }


          async weightCheck(e) {
            const weight = await this.state.currentWeight;
            if (weight >= 100) {
                alert('Current weight among your developers is ' + weight)
            } else {
              this.showWeight()
            }
          }


          async showWeight (e) {
            const contractCall = await this.state.contract.methods;
            //const thisAdmin = contractCall.admins().call();
            e.preventDefault();
            const ib = await contractCall.weightGuard().call();
              return this.setState({
                currentWeight: ib
              });
            }

          async removeDev (e) {
            const contractCall = await this.state.contract.methods;
            const accounts = await this.state.accounts;
            //const thisAdmin = contractCall.admins().call();
            e.preventDefault();

            await contractCall.removeSingleDev(this.state.removeDev, this.state.devInList)
              .send({ from: accounts[0] });
            }

          async acceptStep (e) {
            const contractCall = await this.state.contract.methods;
            const accounts = await this.state.accounts;
            try{
            const stepaccepted = await contractCall.stepAccept()
            .send({ from: this.state.accounts[0] });

            this.setState({
              stepz: stepaccepted,
            });
            return this.checkStep();
          } catch(error) {
            alert(`Only Admin can do this. Control your Metamask account`);
            console.log(error);
          }
        }



    async testOracle (error, event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;
      const web3 = this.state.web3;
      const oracleMoney = web3.utils.toWei(
        this.state.oracleFee,
        'ether'
      )
      try {
      await contractCall.updateStars().send({
        from: accounts[0],
        gas: 220000,
        value: oracleMoney
      });
      const oris = await contractCall.repoStars().call()
      alert(`The Oracle says: ` + oris);
    } catch(error) {
      alert(`The Ethereum Bridge is not accessible. Only works on testnet. If private network, this is only for demonstration purposes`);
      console.log(error);
    }
  }

    updateContractTime(e) {
      this.setState({
        contractTime: e.target.value
      });
    }


    async withdrawFromContract (event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;

      try {
      await contractCall.withdrawal().send({ from: accounts[0] });
    } catch(error) {
      console.log(error)
    };
  }


    async killContract(event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;
      try {
      alert("Are you sure? You know what you're doing?");
      await contractCall.contractKill().send({ from: accounts[0] });
      this.setState({ contractIsActive: false });
      }catch(error){
        console.log(error);
      }
    }


    async deadlineExtend(event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;
      await contractCall.extendDeadline().send({ from: accounts[0] });
    }


    async pauseContract(event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;

      await contractCall.pause().send({ from: accounts[0] });
      this.setState({ contractIsActive: false });
    }


    async continueContract(event) {
      const contractCall = await this.state.contract.methods;
      const accounts = await this.state.accounts;
      await contractCall.resumeContract().send({ from: accounts[0] });
      this.setState({ contractIsActive: true });
    }


    async testila(e) {
      const accounts = await this.state.accounts;
      const accountThis = await accounts[0];
      const contractCall = await this.state.contract.methods;
      const test3r = await contractCall.developers(accountThis).call();
      const infodev4 = await test3r['isDeveloper'];
      const ownerWho = await contractCall.owner().call();

      if (infodev4 === true || accountThis === ownerWho) {
        console.log("Everything seems to work fine at this point :)");
      } else {
        alert(
          'Switch to admin or developer account in Metamask and reload site'
        )
      }
    }


    async startContract(event) {
      const contractCall = await this.state.contract.methods;
      const web3 = this.state.web3;
      const accounts = await this.state.accounts;
      const timee = await this.state.timis;
      const amount = web3.utils.toWei(
        this.state.moneySend,
        'ether'
      )

      try {
      await contractCall.startWork(timee).send({
        from: accounts[0],
        value: amount
      });
      alert(`Your contract is up and running!`)
    } catch(error) {
      console.log(error)
      console.log(`Something went wrong. Control developers' weight, which in total needs to be 100%`);
    };
  }


    async getDevInfo(event) {
      const contractCall = await this.state.contract.methods;

      const devInfo = await this.state.checkDev;
      //console.log(devInfo);

      const test3r = await contractCall.developers(devInfo).call();
      const infodev1 = await JSON.stringify(test3r['developerAddress']);
      const infodev2 = await JSON.stringify(test3r['weight']);
      const infodev3 = await JSON.stringify(test3r['acceptedSteps']);
      const infodev4 = await JSON.stringify(test3r['isDeveloper']);
      const infodev5 = await JSON.stringify(test3r['withdrawalCounter']);
      console.log(test3r);
      this.setState({
         infoDev1: infodev1,
         infoDev2: infodev2,
         infoDev3: infodev3,
         infoDev4: infodev4,
         infoDev5: infodev5
      });
  }


  async getContractInfo (event) {
    try {
    const contractCall = await this.state.contract.methods;

    const isActive = await contractCall.contractActive().call();
    const checkBal = await contractCall.checkBalance().call();
    const endTime = await contractCall.contractEndTime().call();
    const deposit = await contractCall.depositAmount().call();
    const devNumber = await contractCall.numberOfDevs().call();
    const ownerWho = await contractCall.owner().call();
    const stepTime = await contractCall.timeStep().call();


    this.setState({ contractIsActive: isActive, balanceCheck: checkBal,
    contractEnd: endTime, depositSum: deposit,
    devsNumber: devNumber, ownerIs: ownerWho, tStep: stepTime });
    await console.log("Is contract active: " + isActive);
  }
    catch (error) {
      alert('Didnt work out this time. Try once more or reload page')
    };
}

    render() {
      return (
        <div>
        <div className="header">
          <h1>A Simple Bounty Contract</h1>
          <h3>- A dApp created by Filip Sundgren</h3>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/2000px-Ethereum_logo_2014.svg.png" alt="Ethereum"></img>
          </div>
            <hr id="hrr"></hr>
              <div className="main">
                <div className="row">
                  <div className="someDescription">
                    <h3><u>Admin Section</u></h3>
                  </div>
                  <div className="someDescription2">
                    <h2>Admin tools</h2>
                  </div>
                  <div className="adminTools">
                  <form onSubmit={this.createAdmin}>
                    <input type="string"
                      placeholder="Admin address"
                      className="addAdminz"
                      value={this.state.adminAddress}
                      onChange={this.updateAdminInput}/>
                      <button href="#" id="buttons" className="btn addAdmin">Add Admin</button>
                    </form>
                  <form>
                    <input type="string"
                      placeholder="Admin address"
                      className="removeAdminz"
                      value={this.state.removeAdmin}
                      onChange={(e) => this.setState({removeAdmin: e.target.value})}
                    />
                      <button href="#" id="buttons" className="btn removeAdmin" onClick={this.removeAdmin}>
                        Remove Admin
                      </button>
                    </form>
                    <form onSubmit={this.createDeveloper}>
                      <input type="string"
                      placeholder="Developer address"
                      className="devAddrez"
                      value={this.state.devAddress}
                      onChange={this.updateAddressInput}/>
                      <input type="number"
                        placeholder="Reward"
                        className="devWeightz"
                        value={this.state.devWeight}
                        onChange={this.updateDevWeight}/>
                    <button href="#" id="buttons" className="btn addDev">Add Developer</button>
                    </form>
                    <input type="string"
                      placeholder="Developer address"
                      className="singledevaddress"
                      value={this.state.removeDev}
                      onChange={(e) => this.setState({removeDev: e.target.value})}
                    />
                    <input type="number"
                      placeholder="Dev's number in list"
                      className="devaddressinlist"
                      value={this.state.devInList}
                      onChange={(e) => this.setState({devInList: e.target.value})}
                    />
                    <button href="#" id="buttons" className="btn removeDev" onClick={this.removeDev}>
                      Remove Dev
                    </button>
                  </div>
                  <button href="#" id="oracleButton" onClick={this.testOracle}>
                    Oracle
                  </button>
                  <div className="someText">
                    <h3>&#8226; Start Your Contract Here!</h3>
                    <p>
                      Decide the number of Ethers and the number of weeks the contract should be running.
                    </p>
                  </div>
                  <div className="startiz">
                    <div className="alla">
                    <input type="number"
                      placeholder="Ether"
                      className="sendz"
                      value={this.state.moneySend}
                      onChange={(e) => this.setState({moneySend: e.target.value})}
                    />
                    <input type="number"
                      placeholder="Weeks"
                      className="timez"
                      value={this.state.timis}
                      onChange={(e) => this.setState({timis: e.target.value})}
                    />
                    <button href="#" id="buttons" className="btn startContract" onClick={this.startContract}>
                      Start
                    </button>
                  </div>
                  </div>
                  <div className="description1">
                      <p className="twentysixpoint"> &#8226; After this function, the contract will start and its deadline will be for as many weeks you inserted above.
                      The contract is hard coded and consists of 4 steps, each one having a deadline one 4th of the total contract time.
                      </p>
                  </div>
                  <div className="showWeightButton">
                    This will show current weight in the contract.
                    <br></br>
                    When starting the contract, it should be 100%.
                    <br></br>
                    <button href="#" id="buttons" className="btn showWeight" onClick={this.showWeight}>
                      Current Weight
                    </button>
                    <p>
                      {this.state.currentWeight}
                    </p>
                  </div>
                  <div className="extend">
                    <p>Contract Deadline: {this.state.contractEnd}</p>
                    <button href="#" id="buttons" className="btn extendiz" onClick={this.deadlineExtend}>
                      Extend deadline
                    </button>
                  </div>
                  <div className="devis">
                    <center><h2>Developer Status</h2></center>
                  </div>
                  <div className="devis2">
                    <input type="string"
                      placeholder="Developer address"
                      className="infoDevv"
                      value={this.state.checkDev}
                      onChange={(e) => this.setState({checkDev: e.target.value})}
                    />
                    <button href="#" id="buttons" className="btn devInfo" onClick={this.getDevInfo}>
                      Dev Info!
                    </button>
                  </div>
                <div className="infoDev">
                  <p><b> Dev Address: {this.state.infoDev1}</b></p>
                  <hr></hr>
                  <p><b>  Weight: {this.state.infoDev2}</b></p>
                  <hr></hr>
                  <p> <b> Steps Accepted: {this.state.infoDev3}</b></p>
                  <hr></hr>
                  <p> <b> isDeveloper: {this.state.infoDev4}</b></p>
                  <hr></hr>
                  <p><b>  Withdrawals made: {this.state.infoDev5}</b></p>
                </div>
                <div className="buttonVanni">
                  <button href="#" id="buttons" className="btn infoContract" onClick={this.getContractInfo}>
                    Contract Info
                  </button>
                </div>
                  <div className="vanni">
                      <p><strong>stepTime: </strong>{this.state.tStep}</p>
                      <hr></hr>
                      <p><strong>balanceCheck: </strong>{this.state.balanceCheck}</p>
                      <hr></hr>
                      <p><strong>Step: </strong>{this.state.countStep}</p>
                      <hr></hr>
                      <p><strong>contractEnd: </strong>{this.state.contractEnd}</p>
                      <hr></hr>
                      <p><strong>Deposit Amount: </strong>{this.state.depositSum}</p>
                      <hr></hr>
                      <p><strong>Number of Devs: </strong>{this.state.devsNumber}</p>
                      <hr></hr>
                      <p><strong>Owner Address: </strong>{this.state.ownerIs}</p>
                    </div>
                  <div className="onOff">
                    <h2><center>
                      Circuit Breaker
                    </center>
                    </h2>
                  <button href="#" id="buttons" className="btn pauseContract" onClick={this.pauseContract}>
                    Pause Contract
                  </button>
                  <button href="#" id="buttons" className="btn continueContract" onClick={this.continueContract}>
                    Resume Contract
                  </button>
                </div>
                <div className="counter">
                  <h3>Current Step: </h3>
                <div className="countmf">
                 { this.state.countStep }
                </div>
              </div>
              <div className="topic1">
                <h3>
                  Here you can easily find information about your contract!
                </h3>
              </div>
              <button href="#" id="buttons" className="btn killContract" title="Only Admin can do this" onClick={this.killContract}>
                Kill Contract
              </button>
                <div className="buttonmix">
                  <button href="#" id="acceptStep" title="Only Admin can do this" onClick={this.acceptStep}>
                    Accept Step
                  </button>
                  <button href="#" id="withdrawbutton" title="Only Developers can do this" onClick={this.withdrawFromContract}>
                  Withdraw
                  </button>
                </div>
                    <div className="row">
                  </div>
                 <div className="container top" align="right">
                   {this.state.contractStatus}
                 </div>
            </div>
          </div>
          <div className="nextDiv">
          </div>

          <div className="infoDiv">
            <div className="infoText1">
              <h2>
                Information Section
              </h2>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/2000px-Ethereum_logo_2014.svg.png" alt="Ethereum" id="eth"></img>
            <div className="info2">
            <p><b>Some headsup when interacting with this dApp:</b></p>
            <p>- The web3 doesn't always recognize changes of metamask accounts. Refresh the page in order to connect to the chosen account</p>
            <p>- The Oracle doesn't work on the private net as you need the have an Ethereum bridge (can get with npm), but it's still included to show how the interaction works.</p>
            <p>- Always have the console open and be observant on the messages.</p>
            <p>- The code written in React isn't very efficient and some things might break because of that. Just reload page and try again if something doesn't work.</p>
            <p>- For fastest contact: <b>filip.sundgren@hotmail.se</b></p>
          </div>
          </div>
          <hr id="hrr2"></hr>
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
