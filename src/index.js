import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './App';
import Login from './Login';
import NotFound from './NotFound';
import auth from './auth'

import './index.css';

function requireAuth(nextState, replace) {
	if (!auth.loggedIn()) {
	// 	replace({
	// 		pathname: '/login',
	// 		state: { nextPathname: nextState.location.pathname }
	// 	})
	}
}

const Root = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App} onEnter={requireAuth} />
			<Route path="/login" component={Login}/>
			<Route path="*" component={NotFound}/>
		</Router>
  	)
};

render(<Root />, document.getElementById('root'));
