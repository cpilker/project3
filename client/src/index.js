import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
