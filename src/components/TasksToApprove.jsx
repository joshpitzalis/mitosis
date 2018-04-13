import React from 'react';
import { Button } from 'antd';
import { compose, withHandlers } from 'recompose';
import { projectInstance } from '../instances';
import web3 from '../web3';

const Tasks = ({ tasks, approveTask, address, rejectTask }) => {
  return (
    <div className="pa4">
      <h2 className="App-title f3 tc">Work To Approve</h2>
      <div className="overflow-auto">
        <table className="f6 w-100 mw8 center" cellSpacing="0">
          <thead className="stripe-dark">
            <tr>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Task</th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white" />
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">By</th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">
                Approvals
              </th>
              <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white" />
            </tr>
          </thead>
          <tbody className="lh-copy">
            {tasks &&
              tasks.map((task, index) => (
                <tr key={index}>
                  <td className="pv3 pr3 bb b--black-20">{task[1]}</td>
                  <td className="pv3 pr3 bb b--black-20" />
                  <td className="pv3 pr3 bb b--black-20">
                    <span className="w3 truncate dib">{task[0]}</span>
                  </td>
                  <td className="pv3 pr3 bb b--black-20">{task[3]}</td>
                  <td className="pv3 pr3 bb b--black-20 flex jca">
                    <Button type="primary" onClick={() => approveTask(task[2])}>
                      Approve
                    </Button>
                    <Button onClick={() => rejectTask(task[2])} type="danger">
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default compose(
  withHandlers({
    approveTask: ({ getTasks, address }) => async taskId => {
      try {
        const accounts = await web3.eth.getAccounts();
        await projectInstance(address)
          .methods.approveDeliverable(taskId)
          .send({
            from: accounts[0]
          });
        await getTasks();
      } catch (err) {
        console.error(err);
      }
    },
    rejectTask: ({ getTasks, address }) => async taskId => {
      try {
        const accounts = await web3.eth.getAccounts();
        await projectInstance(address)
          .methods.rejectDeliverable(taskId)
          .send({
            from: accounts[0]
          });
        await getTasks();
      } catch (err) {
        console.error(err);
      }
    }
  })
)(Tasks);
