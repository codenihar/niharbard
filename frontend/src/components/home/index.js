import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    state = {
        input: "",
        output: ""
    };

    handleInputChange = (event) => {
        this.setState({
            input: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://bard.ai/api/v1/generate", {
            text: this.state.input
        })
            .then(response => {
                this.setState({
                    output: response.data.text
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSubmit}>Generate</button>
                <h1>{this.state.output}</h1>
            </div>
        );
    }
}

export default Home;
