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
		this.updateItem = this.updateItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.logout = this.logout.bind(this);

		// initial state
		this.state = {
			items: [],
			editMode: false
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

	updateItem(e, id) {
		// update state
		const items = [...this.state.items];

		// utility function
		const itemById = (item) => item.id === id;

		// reference
		const index = items.indexOf(items.find(itemById));

		// get the item
		const item = items[index];

		// copy existing item to new object
		const updatedItem = {...item}

		// update name property
		updatedItem.name = e.target.value;

		items[index] = updatedItem;

		this.setState({ items }); // shorthand for {items: items}
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
		items.splice(index, 1);

		// update state
		this.setState({
			items: items
		});
	}

	toggleEditMode() {
		// get state
		let editMode = this.state.editMode;

		// toggle
		editMode = (editMode) ? false : true;

		// set state
		this.setState({ editMode })
	}

	logout() {
		base.unath();
	}

	render() {
		if (log) console.log('render()');
		let editModeBtnText = (this.state.editMode) ? 'Save' : 'Edit list';
		return (
		<div className="wrapper">
			<h1>Shopping List</h1>
			<button onClick={() => this.logout()}>Logout</button>
			<br />
			<AddForm addItem={this.addItem} />
			<button onClick={() => this.toggleEditMode()}>{editModeBtnText}</button>
			<List
				list={this.state.items}
				listUpdate={this.listUpdate}
				updateItem={this.updateItem}
				removeItem={this.removeItem}
				editMode={this.state.editMode}
			/>
		</div>
		)
	};
}

export default App;
