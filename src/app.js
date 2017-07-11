import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const css = require('./app.scss');

class ToggleButton extends Component {
	constructor(props){
		super(props);
		this.state = {isOn: true};
		this.buttonClick = this.buttonClick;
	}
	buttonClick = () => {
		this.setState(prevState => (
			{
				isOn: !prevState.isOn
			}
		));
	}
	render(){
		return (
			<div>
				<button className="ToggleButton" onClick={this.buttonClick}>
					This is a toggle button
					{this.state.isOn ? ": ON" : ": OFF"}
				</button>
			</div>
		);
	}
}

ReactDOM.render(
  <ToggleButton/>,
  document.getElementById('root')
);
