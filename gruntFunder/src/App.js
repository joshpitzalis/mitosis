import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import ProjectFactoryContract from '../build/contracts/ProjectFactory.json';
import getWeb3 from './utils/getWeb3';
import { Link } from 'react-router-dom';
const contract = require('truffle-contract');
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  instantiateContract() {
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    var simpleStorageInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage
        .deployed()
        .then(instance => {
          simpleStorageInstance = instance;
          // Stores a given value, 5 by default.
          return simpleStorageInstance.set(5, { from: accounts[0] });
        })
        .then(result => {
          // Get the value from the contract to prove it worked.
          return simpleStorageInstance.get.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result.
          return this.setState({ storageValue: result.c[0] });
        })
        .catch(error => console.error(error));
    });
  }

  createProject = () => {
    console.log('000');

    const projectFactory = contract(ProjectFactoryContract);
    projectFactory.setProvider(this.state.web3.currentProvider);
    var projectFactoryInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      projectFactory
        .deployed()
        .then(instance => {
          console.log('aaa');
          projectFactoryInstance = instance;
          return projectFactoryInstance.createProject({ from: accounts[0] });
        })
        .then(result => {
          console.log('bbb');
          return projectFactoryInstance.getDeployedCampaigns();
        })
        .then(result => {
          console.log('result', result);
          return this.setState({ projects: result });
        })
        .catch(error => console.error(error));
    });
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    let { projects } = this.state;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">
            Truffle Box
          </a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>
                If your contracts compiled and migrated successfully, below will
                show a stored value of 5 (by default).
              </p>
              <p>
                Try changing the value stored on <strong>line 59</strong> of
                App.js.
              </p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
          <CreateForm handleSubmit={this.createProject} />
          {projects && <AllProjects projects={projects} />}
        </main>
      </div>
    );
  }
}

export default App;

const AllProjects = ({ projects }) => {
  return (
    <div class="pa4">
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr class="stripe-dark">
              {/* <th class="fw6 tl pa3 bg-white">Project Name</th>
              <th class="fw6 tl pa3 bg-white">Grunts</th>
              <th class="fw6 tl pa3 bg-white">Project Link</th> */}
              <th class="fw6 tl pa3 bg-white">Contract Address</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            <tr class="stripe-dark">
              <td class="pa3">
                <Link
                  to={`/project/0x23BA231Ab7976880d322b604a6C90F94fa541d81`}
                >
                  {'0x23ba231ab7976880d322b604a6c90f94fa541d81'}
                </Link>
              </td>
            </tr>

            {projects.map(address => (
              <tr class="stripe-dark">
                {/* <td class="pa3">Hassan Johnson</td>
                <td class="pa3">@hassan</td>
                <td class="pa3">hassan@companywithalongdomain.co</td> */}
                <td class="pa3">
                  <Link to={`/project/${address}`}>{address}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CreateForm = ({ handleSubmit }) => {
  return (
    <input
      className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns"
      type="submit"
      value="Create A New Project"
      onClick={() => handleSubmit}
    />
  );
};
