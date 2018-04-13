import React from 'react';
import { Button } from 'antd';
import { withState, compose, withHandlers } from 'recompose';
import { projectInstance } from '../instances';
import web3 from '../web3';

const Submit = ({
  taskDescription,
  onChange,
  inputVal,
  loading,
  handleLoading,
  getTasks,
  sendTask
}) => {
  return (
    <div className="pa4-l" data-test="submitForm">
      <form
        className="mw7 center pa4 br2-ns ba b--black-10"
        onSubmit={sendTask}
      >
        <fieldset className="cf bn ma0 pa0">
          <legend className="pa0 f5 f4-ns mb3 black-80">
            Submit a 2 Hour Deliverable
          </legend>
          <div className="cf">
            <label className="clip" htmlFor="email-address">
              Task
            </label>
            <input
              data-test="addTaskInput"
              className="f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100  br2-ns "
              placeholder=" Task Description"
              type="text"
              name="email-address"
              value={taskDescription}
              id="email-address"
              onChange={e => onChange(e.target.value)}
            />

            <br />
            <br />
            <br />
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="mt3"
            >
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default compose(
  withState('taskDescription', 'onChange', ''),
  withState('loading', 'handleLoading', false),

  withHandlers({
    sendTask: ({
      handleLoading,
      taskDescription,
      getTasks,
      onChange,
      address
    }) => async e => {
      e.preventDefault();
      handleLoading(true);
      try {
        const accounts = await web3.eth.getAccounts();
        await projectInstance(address)
          .methods.addDeliverable(taskDescription)
          .send({
            from: accounts[0],
            gas: 2000000
          });
        await getTasks();

        onChange('');
        handleLoading(false);
      } catch (err) {
        console.error(err);
        handleLoading(false);
      }
    }
  })
)(Submit);
