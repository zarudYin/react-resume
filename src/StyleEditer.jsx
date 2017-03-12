import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "prismjs";
import "prismjs/themes/prism.css";
import { PrismCode } from "react-prism";

class StyleEditer extends Component {

    render() {
        return (
            <div className="style-editor">
                <pre>
                    <PrismCode className="language-css">{this.props.content}</PrismCode>
                </pre>
            </div>
        );
    }

    componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 10000;
	}
}

export default StyleEditer;
