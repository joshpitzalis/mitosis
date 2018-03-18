import React from 'react';
import { Button } from 'antd';
import { withState, compose, withHandlers } from 'recompose';
import instance from '../instance';
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
    <div className="pa4-l">
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
              className="f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100  br2-ns "
              placeholder=" Task Description"
              type="text"
              name="email-address"
              value={taskDescription}
              id="email-address"
              onChange={e => onChange(e.target.value)}
            />
            {/* <input
                className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                type="submit"
                value="Subscribe"
              /> */}
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
      onChange
    }) => async e => {
      e.preventDefault();
      handleLoading(true);
      try {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.addDeliverable(taskDescription).send({
          from: accounts[0]
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
