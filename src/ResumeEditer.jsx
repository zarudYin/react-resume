import React, { Component } from 'react';
import ReactDOM from "react-dom";
import marked from "marked";

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

class ResumeEditer extends Component {

    render() {
        if (this.props.isMarkdown) {
            debugger
            var a = marked(this.props.content);
            console.log(a);
        }
        return (
            <div className="resume-editor">
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: this.props.isMarkdown ? marked(this.props.content) : this.props.content }}></code>
                </pre>
            </div>
        );
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollTop = 10000;
    }
}

export default ResumeEditer;
