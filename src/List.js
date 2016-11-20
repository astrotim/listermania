import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
	render() {
		return (
		<ul className="lm-list" onChange={this.props.listUpdate()}>
			{this.props.list.map((item, i) => <Item key={item.id} id={item.id} i={i} itemName={item.name} removeItem={this.props.removeItem} />)}
		</ul>
		)
	};
}

export default List;