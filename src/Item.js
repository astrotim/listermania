import React, { Component } from 'react';

class Item extends Component {
	render() {
		return (
		<li className="lm-item" key={this.key}>
			<input type="checkbox" id={`lm-itemId_${this.props.id}`} />
			<label htmlFor={`lm-itemId_${this.props.id}`} className="lm-item__name">{this.props.itemName}</label>
			<button onClick={() => this.props.removeItem(this.props.id)}>Remove</button>
		</li>
		)
	};
}

export default Item;