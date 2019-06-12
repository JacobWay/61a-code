import * as React from "react";

export default class StdinElem extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    handleInput(e) {
        let text = e.currentTarget.innerText;
        const lines = text.split(/\r\n|\r|\n/);
        for (let i = 0; i !== lines.length - 1; ++i) {
            if (lines[i] === "" && i === lines.length - 2) {
                continue; // TODO: FIX UGLY HACK
            }
            this.props.onInput(`${lines[i]}\n`);
        }
        text = lines[lines.length - 1];
        if (lines.length > 1) {
            this.inputRef.current.innerText = text;
        }
    }

    focus() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <span
                ref={this.inputRef}
                className="consoleInput"
                onInput={this.handleInput.bind(this)}
                contentEditable="plaintext-only"
            />
        );
    }
}