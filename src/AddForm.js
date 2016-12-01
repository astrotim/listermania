import React, { Component } from 'react';

class AddForm extends Component {
	createItem(event) {
		event.preventDefault();
		const item = {
			name: this.item.value,
			id: Date.now()
		}
		console.log('item:', item);
		this.props.addItem(item);
		this.addForm.reset();
	}

	render() {
		return (
		<form ref={(input) => this.addForm = input} className="lm-add-form" onSubmit={(e) => this.createItem(e)}>
			<label htmlFor="addInput" className="sr-only">New item</label>
			<input ref={(input) => this.item = input} type="text" id="addInput" placeholder="Add item" />
			<button className="lm-add-form__btn waves-effect waves-light btn" type="submit"><i className="material-icons">add</i></button>
		</form>
		)
	};
}

export default AddForm;