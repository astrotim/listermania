import React, { Component } from 'react';
import AddForm from './AddForm';
import List from './List';
import base from './base';
import './App.css';

const log = false;

class App extends Component {
	constructor() {
		if (log) console.log('constructor()');
		super();

		// bind methods to <App />
		this.addItem = this.addItem.bind(this);
		this.listUpdate = this.listUpdate.bind(this);
		this.removeItem = this.removeItem.bind(this);

		// initial state
		this.state = {
			items: []
		};
	}

	componentWillMount() {
		if (log) console.log('componentWillMount()');
		// sync with Firebase
		this.ref = base.syncState(`list`, {
			context: this,
			state: 'items',
			asArray: true
		});

		// sync with local storage
		const storage = localStorage.getItem('listItems');
		if (storage) {
			// update
			this.setState({
				items: JSON.parse(storage)
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		if (log) console.log('componentWillUpdate()');
		if (log) console.log({nextProps, nextState});
	}

	addItem(item) {
		// update state
		const items = [...this.state.items];
		// add new item
		items.push(item);
		// set state
		this.setState({
			items: items
		});
	}

	listUpdate() {
		let itemsJson = JSON.stringify(this.state.items);
		localStorage.setItem('listItems', itemsJson);
	}

	removeItem(id) {
		// update state
		const items = [...this.state.items];

		// utility function
		const itemById = (item) => item.id === id;

		// reference
		const index = items.indexOf(items.find(itemById));

		// delete
		items[index] = null;

		// update state
		this.setState({
			items: items
		});
	}

	render() {
		if (log) console.log('render()');
		return (
		<div className="wrapper">
			<h1>Shopping List</h1>
			<AddForm addItem={this.addItem} />
			<List
				list={this.state.items}
				listUpdate={this.listUpdate}
				removeItem={this.removeItem}
			/>
		</div>
		)
	};
}

export default App;
