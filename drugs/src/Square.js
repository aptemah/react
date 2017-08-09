import React, { Component } from 'react';
import './Square.css';

function Square(props) {
	return (
		<button className="square bold" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

export default Square;