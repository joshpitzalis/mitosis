import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/Landing';
import Create from './pages/createAProject';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import 'tachyons';
import 'antd/dist/antd.css';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Create} />
      <Route path="/project/:address" component={App} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
