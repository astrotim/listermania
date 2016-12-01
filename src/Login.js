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

	componentWillMount() {
		// sync with Firebase
		this.ref = base.syncState(`uid`, {
			context: this,
			state: 'uid'
		});
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

		// update localStorage
		localStorage.setItem('uid', authData.user.uid);

		// update state
		this.setState({
			uid: authData.user.uid
		});

		this.props.router.replace('/');
	}

	logout() {
		localStorage.removeItem('uid');

		this.setState({
			uid: null
		});

		base.unauth();
	}

	render() {
		return (
			<div className="login">
				<button className="waves-effect waves-light btn" onClick={() => this.login()}>Login with Google</button>
			</div>
		)
	};
}

export default Login;