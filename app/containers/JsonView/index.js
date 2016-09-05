import React from 'react';
//import styles from './styles.css';

export default class JsonView extends React.Component {

state = { 
  show: true
}

style = {
    fontSize: '0.5em',
}

headerStyle = {
    padding: '10px',
    fontFamily: 'monospace',
}

preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
    overflow: 'scroll',
    lineHeight: '1.5em'
}


toggle = () => {
    this.setState({
        show: !this.state.show,
    });
}

render() {
    return (
        <div style={this.style}>
            <div style={this.headerStyle} onClick={ this.toggle }>
                <strong>{this.props.name || 'JsonView'}</strong>
            </div>
            {( this.state.show &&
                <pre style={this.preStyle}>
                    {JSON.stringify(this.props.data, null, 2) }
                </pre>
            )}
        </div>
    );
}

}
