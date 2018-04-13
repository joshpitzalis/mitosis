import React, { Component } from 'react';
import web3 from '../web3';
import { factoryInstance } from '../instances';
import { Link } from 'react-router-dom';

class Create extends Component {
  state = { name: '', projects: [] };

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    factoryInstance.methods
      .getDeployedCampaigns()
      .call()
      .then(projects => {
        this.setState({ projects });
      });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log('this.state.name', this.state.name);
    const accounts = await web3.eth.getAccounts();
    await factoryInstance.methods.createProject().send({
      from: accounts[0]
    });
    this.refresh();
  };
  render() {
    let { projects } = this.state;
    return (
      <div className="pa4-l">
        <form
          className="bg-light-red mw7 center pa4 br2-ns ba b--black-10"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="cf bn ma0 pa0">
            <legend className="pa0 f5 f4-ns mb3 black-80">
              Create a New project
            </legend>
            <div className="cf">
              <label className="clip" for="name">
                Project Name
              </label>
              <input
                className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                placeholder="Your Project's Name"
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <input
                className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                type="submit"
                value="Create"
              />
            </div>
          </fieldset>
        </form>

        {projects && <AllProjects projects={projects} />}
      </div>
    );
  }
}

export default Create;

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
