import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/Landing';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import 'antd/dist/antd.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
