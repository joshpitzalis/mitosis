import React, { Component } from 'react';
import logo from './logo.svg';
import mitosis from './mitosis.png';
import './App.css';
import { List, Avatar, Divider, Button } from 'antd';
import PieChart from 'react-simple-pie-chart';

class App extends Component {
  render() {
    const data = [
      {
        title: 'Ant Design Title 1',
        color: '#333333'
      },
      {
        title: 'Ant Design Title 2',
        color: '#555555'
      },
      {
        title: 'Ant Design Title 3',
        color: '#777777'
      },
      {
        title: 'Ant Design Title 4',
        color: '#999999'
      }
    ];

    const slices = [
      { color: '#333333', value: 10 },
      { color: '#555555', value: 20 },
      { color: '#777777', value: 30 },
      { color: '#999999', value: 40 }
      // { color: '#BBBBBB', value: 50 }
    ];
    return (
      <div className="sans-serif pa5">
        {/* <header className="ma4 pv3 tc">
          <img src={mitosis} className="App-logo" alt="logo" />
          <h1 className="App-title f1">Mitosis</h1>
        </header> */}

        <Stats />
        <Divider />
        <div className="ma4 tl flex items-center justify-around">
          <div className="w-30 dib ">
            <PieChart slices={slices} />
          </div>
          <div className="w-50 dib">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div
                        className="br-100 h3 w3"
                        style={{ backgroundColor: item.color }}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </div>
        </div>

        <Divider />
        <Tasks />
        <Divider />
        <Submit />
      </div>
    );
  }
}

export default App;

const Tasks = () => {
  return (
    <div className="pa4">
      <h2 className="App-title f3 tc">To Approve</h2>
      <div className="overflow-auto">
        <table className="f6 w-100 mw8 center" cellspacing="0">
          <thead className="stripe-dark">
            <tr>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Task</th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">By</th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">
                Approvals
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">
                Time remaining
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white" />
            </tr>
          </thead>
          <tbody className="lh-copy">
            <tr>
              <td className="pv3 pr3 bb b--black-20">Hassan Johnson</td>
              <td className="pv3 pr3 bb b--black-20">@hassan</td>
              <td className="pv3 pr3 bb b--black-20">
                hassan@companywithalongdomain.co
              </td>
              <td className="pv3 pr3 bb b--black-20">14419232532474</td>
              <td className="pv3 pr3 bb b--black-20">
                <Button
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                  className="mt3"
                >
                  Approve
                </Button>
              </td>
            </tr>
            <tr className="stripe-dark">
              <td className="pv3 pr3 bb b--black-20">Taral Hicks</td>
              <td className="pv3 pr3 bb b--black-20">@hicks</td>
              <td className="pv3 pr3 bb b--black-20">
                taral@companywithalongdomain.co
              </td>
              <td className="pv3 pr3 bb b--black-20">72326219423551</td>
              <td className="pv3 pr3 bb b--black-20">
                <Button
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                  className="mt3"
                >
                  Approve
                </Button>
              </td>
            </tr>
            <tr>
              <td className="pv3 pr3 bb b--black-20">Tyrin Turner</td>
              <td className="pv3 pr3 bb b--black-20">@tt</td>
              <td className="pv3 pr3 bb b--black-20">
                ty@companywithalongdomain.co
              </td>
              <td className="pv3 pr3 bb b--black-20">92325170324444</td>
              <td className="pv3 pr3 bb b--black-20">
                <Button
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                  className="mt3"
                >
                  Approve
                </Button>
              </td>
            </tr>
            <tr className="stripe-dark">
              <td className="pv3 pr3 bb b--black-20">Oliver Grant</td>
              <td className="pv3 pr3 bb b--black-20">@oli</td>
              <td className="pv3 pr3 bb b--black-20">
                oliverg@companywithalongdomain.co
              </td>
              <td className="pv3 pr3 bb b--black-20">71165170352909</td>
              <td className="pv3 pr3 bb b--black-20">
                <Button
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                  className="mt3"
                >
                  Approve
                </Button>
              </td>
            </tr>
            <tr>
              <td className="pv3 pr3 bb b--black-20">Dean Blanc</td>
              <td className="pv3 pr3 bb b--black-20">@deanblanc</td>
              <td className="pv3 pr3 bb b--black-20">
                dean@companywithalongdomain.co
              </td>
              <td className="pv3 pr3 bb b--black-20">71865178111909</td>
              <td className="pv3 pr3 bb b--black-20">
                <Button
                  type="primary"
                  loading={false}
                  onClick={() => {}}
                  className="mt3"
                >
                  Approve
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <article class="pa3 pa5-ns" data-name="slab-stat">
      <h1>Today</h1>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Total Hours</dd>
        <dd class="f3 f2-ns b ml0">1,024</dd>
      </dl>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Completed Tasks</dd>
        <dd class="f3 f2-ns b ml0">993</dd>
      </dl>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Pending Approvals</dd>
        <dd class="f3 f2-ns b ml0">10-22</dd>
      </dl>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Grunts</dd>
        <dd class="f3 f2-ns b ml0">4</dd>
      </dl>
      <dl class="dib">
        <dd class="f6 f5-ns b ml0">Balance</dd>
        <dd class="f3 f2-ns b ml0">1200 ETH</dd>
      </dl>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Project Link</dd>
        <dd class="f3 f2-ns b ml0">
          <small>
            <a href="">https://github.com/joshpitzalis/mitosis</a>
          </small>
        </dd>
      </dl>
    </article>
  );
};

const Submit = () => {
  return (
    <div class="pa4-l">
      <form class="mw7 center pa4 br2-ns ba b--black-10">
        <fieldset class="cf bn ma0 pa0">
          <legend class="pa0 f5 f4-ns mb3 black-80">
            Submit a 2 hour task
          </legend>
          <div class="cf">
            <label class="clip" for="email-address">
              Task
            </label>
            <input
              className="f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100  br2-ns "
              placeholder=" Task Description"
              type="text"
              name="email-address"
              value=""
              id="email-address"
            />
            {/* <input
              class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
              type="submit"
              value="Subscribe"
            /> */}
            <br />
            <br />
            <Button
              type="primary"
              loading={false}
              onClick={() => {}}
              className="mt3"
            >
              Click me!
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
