import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './App';
import Login from './Login';
import NotFound from './NotFound';
import './index.css';

const Root = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App} />
			<Route path="/login" component={Login}/>
			<Route path="*" component={NotFound}/>
		</Router>
  	)
};

render(<Root />, document.getElementById('root'));
