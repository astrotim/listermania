import React, { Component } from 'react';
import base from './base';

class Login extends Component {
	constructor() {
		super();

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);

		this.state = {
			uid: null
		}
	}

	login() {
		base.authWithOAuthPopup('google', this.authHandler);
	}

	authHandler(error, authData) {
		if (error) {
			console.error(error);
			return;
		}

		console.log('logged in as', authData.user.displayName, 'uid:', authData.user.uid);

		this.setState({
			uid: authData.user.uid
		});
	}

	logout() {
		this.setState({
			uid: null
		});

		base.unauth();
	}

	render() {
		return (
			<div>
				<button onClick={() => this.login()}>Login with Google</button>
				<button onClick={() => this.logout()}>Logout</button>
			</div>
		)
	};
}

export default Login;