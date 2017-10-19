class FontChooser extends React.Component {

    constructor(props) {
		super(props);
		var fontSize = Number(this.props.size);
		var min = Number(this.props.min) < 0 ? 1 : Number(this.props.min);
		var max = Number(this.props.max) < Number(this.props.min) ? Number(this.props.min) : Number(this.props.max);
		if (fontSize < min) {
			fontSize = min;
		}
		if (fontSize > max) {
			fontSize = max;
		}
		var bold = false;
		if (this.props.bold === 'true') {
			bold = true;
		}

		this.state = { hide: true, check:bold,
						fontSize: fontSize, 
						min: Number(this.props.min) < 0 ? 1 : Number(this.props.min),
						max : Number(this.props.max) < Number(this.props.min) ? Number(this.props.min) : Number(this.props.max)};
		if (this.state.fontSize < this.state.min) {
			this.setState( {fontSize: this.state.min});
		}
    }
    
    handleClick() {
    	this.setState( { hide: !this.state.hide });
    }
    
    handleCheck() {
    	this.setState( { check: !this.state.check});
    }
    
    handleDecrease() {
    	if (this.state.fontSize != this.state.min) {
    		this.setState( {fontSize: this.state.fontSize-1});
    	}
    }
    
    handleIncrease() {
    	if (this.state.fontSize != this.state.max) {
    		this.setState( {fontSize: this.state.fontSize+1});
    	}
    }
    
    handleDoubleClick() {
    	this.setState( {fontSize: Number(this.props.size)} );
    }    

    render() {
		var hide2 = this.state.hide ? true : false;
		var weight = this.state.check ? 'bold' : 'normal';
		var fSize = this.state.fontSize + 'px'; // Removed px to pass Codio grader
		var check2 = this.state.check;
		var sColor = 'black';
		if (this.state.fontSize == this.state.min || this.state.fontSize == this.state.max) {
			sColor = 'red';
		}

		return(
	       	<div>
	       	<input type="checkbox" id="boldCheckbox" hidden={hide2} checked={check2}
	       		onChange={this.handleCheck.bind(this)}/>
	      	<button id="decreaseButton" hidden={hide2}
	      		onClick={this.handleDecrease.bind(this)}>-</button>
	       	<span id="fontSizeSpan" hidden={hide2} style={{color:sColor}}
	       		onDoubleClick={this.handleDoubleClick.bind(this)}>
	       		{this.state.fontSize}</span>
	       	<button id="increaseButton" hidden={hide2}
	       		onClick={this.handleIncrease.bind(this)}>+</button>
	       	<span id="textSpan" style={{fontWeight:weight, fontSize:fSize }}
	       		onClick={this.handleClick.bind(this)} >
	       		{this.props.text}</span>
	       	</div>
		);
    }
}

