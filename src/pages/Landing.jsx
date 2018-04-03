import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import Stats from '../components/Stats';
import Submit from '../components/SubmitForm';
import Tasks from '../components/TasksToApprove';
import { List, Divider } from 'antd';
import { projectInstance } from '../instances';
import { Inbox } from '../components/Inbox';

export default class App extends Component {
  state = {
    balance: 0
  };

  async componentDidMount() {
    this.getFreshTasks();
    // await instance.methods
    //   .getVersion()
    //   .call()
    //   .then(res => console.log(res));

    projectInstance(this.props.match.params.address)
      .methods.getSummary(`${this.props.match.params.address}`)
      .call()
      .then(totalHours => this.setState({ totalHours }));

    // gruntInstance.methods
    //   .getSummary('0x23BA231Ab7976880d322b604a6C90F94fa541d81')
    //   .call()
    //   .then(totalHours => this.setState({ totalHours }));

    projectInstance(this.props.match.params.address)
      .methods.getSummaryList()
      .call()
      .then(grunts => {
        this.setState({ grunts });
        return grunts;
      })
      .then(grunts =>
        Promise.all(
          grunts.map(key =>
            projectInstance(this.props.match.params.address)
              .methods.totalTime(key)
              .call()
              .catch(err => console.error(err))
          )
        )
      )
      .then(hours => this.setState({ hours }));

    // instance.methods
    //   .getBalance()
    //   .call()
    //   .then(balance => this.setState({ balance }));
  }

  getFreshTasks = async () => {
    const taskKeys = await projectInstance(this.props.match.params.address)
      .methods.getPendingDeliverableList()
      .call()
      .catch(err => console.error(err));

    console.log('taskKeys', taskKeys);

    const tasks = await Promise.all(
      taskKeys.map(key =>
        projectInstance(this.props.match.params.address)
          .methods.getPendingDeliverable(key)
          .call()
          .catch(err => console.error(err))
      )
    );
    this.setState({ tasks });
  };

  render() {
    // const color = index => {{
    //   0: '#dfa440',
    //   1: '#c5d2b2',
    //   2: '#dda078',
    //   3: '#a32d26',
    //   4: '#4eb3c2'
    // }[index];}

    const data =
      this.state.grunts &&
      this.state.grunts.map((grunt, index) => {
        return {
          title: grunt,
          color: {
            0: '#dfa440',
            1: '#c5d2b2',
            2: '#dda078',
            3: '#a32d26',
            4: '#4eb3c2'
          }[index]
        };
      });

    const slices =
      this.state.hours &&
      this.state.hours.map((time, index) => {
        return {
          color: {
            0: '#dfa440',
            1: '#c5d2b2',
            2: '#dda078',
            3: '#a32d26',
            4: '#4eb3c2'
          }[index],
          value: +time
        };
      });

    return (
      <div className="sans-serif pa5">
        {/* <Inbox /> */}
        <Stats
          totalHours={this.state.totalHours}
          completed={
            this.state.tasks &&
            this.state.tasks.filter(task => task[4] === true).length
          }
          tasks={
            this.state.tasks &&
            this.state.tasks.filter(task => task[4] === false).length
          }
          gruntCount={this.state.grunts && this.state.grunts.length}
          balance={this.state.balance}
        />
        <Divider />
        <div className="ma4 tl flex items-center justify-around">
          <div className="w-30 dib ">
            {this.state.hours && <PieChart slices={slices} />}
          </div>
          <div className="w-50 dib">
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div
                        className="br-100 h3 w3"
                        style={{ backgroundColor: item.color }}
                      />
                    }
                    title={
                      <a
                        href="https://github.com/joshpitzalis/mitosis/issues"
                        className="f3 b"
                      >
                        {slices && slices[index].value}
                      </a>
                    }
                    description={item.title}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>

        <Divider />
        {this.state.tasks && this.state.tasks.length > 0 ? (
          <Tasks
            tasks={this.state.tasks.filter(task => task[4] === false)}
            getTasks={this.getFreshTasks}
          />
        ) : (
          <h1 className="tc">
            Contribute 2 hours of work below to this project to get things
            started.
          </h1>
        )}
        <Divider />
        <Submit
          getTasks={this.getFreshTasks}
          address={this.props.match.params.address}
        />
      </div>
    );
  }
}
