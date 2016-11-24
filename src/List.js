import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
	render() {
		let listClass = 'lm-list';
		if (this.props.editMode) listClass = listClass + ' edit-mode';
		return (
		<ul className={listClass} onChange={this.props.listUpdate()}>
			{this.props.list.map((item, i) =>
				<Item
					key={item.id}
					id={item.id}
					i={i}
					itemName={item.name}
					updateItem={this.props.updateItem}
					removeItem={this.props.removeItem}
					editMode={this.props.editMode}
				/>)}
		</ul>
		)
	};
}

export default List;