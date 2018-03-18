import React from 'react';

const Stats = ({ totalHours, completed, tasks, gruntCount, balance }) => {
  return (
    <article className="pa3 pa5-ns" data-name="slab-stat">
      <h1>Today</h1>
      <dl className="dib mr5">
        <dd className="f6 f5-ns b ml0">Total Hours</dd>
        <dd className="f3 f2-ns b ml0">{totalHours}</dd>
      </dl>
      <dl className="dib mr5">
        <dd className="f6 f5-ns b ml0">Completed Tasks</dd>
        <dd className="f3 f2-ns b ml0">{completed}</dd>
      </dl>
      <dl className="dib mr5">
        <dd className="f6 f5-ns b ml0">Pending Approvals</dd>
        <dd className="f3 f2-ns b ml0">{tasks}</dd>
      </dl>
      <dl className="dib mr5">
        <dd className="f6 f5-ns b ml0">Grunts</dd>
        <dd className="f3 f2-ns b ml0">{gruntCount}</dd>
      </dl>
      <dl className="dib">
        <dd className="f6 f5-ns b ml0">Balance</dd>
        <dd className="f3 f2-ns b ml0">{balance} ETH</dd>
      </dl>
      <dl className="dib mr5">
        <dd className="f6 f5-ns b ml0">Project Link</dd>
        <dd className="f3 f2-ns b ml0">
          <small>
            <a href="">https://github.com/joshpitzalis/mitosis</a>
          </small>
        </dd>
      </dl>
    </article>
  );
};

export default Stats;
