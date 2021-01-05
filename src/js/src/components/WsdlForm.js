import {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export class WsdlForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Insert WSDL',
            response: [],
            operation: '',
            template: ''
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOperationSubmit = this.handleOperationSubmit.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleRadioChange(event) {
        this.setState({operation: event.currentTarget.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const axios = require('axios');

        axios
            .put(
                "http://localhost:8080/wsdlToTemplate",
                this.state.value,
                {headers: {"Content-Type": "text/plain"}}
            )
            .then(r => {
                this.setState({response: r.data});
                console.log(r.data)
            })
            .catch(e => console.log(e));
    }

    handleOperationSubmit(event) {
        let operation = this.state.operation;

        console.log(operation);

        event.preventDefault();

        const axios = require('axios');

        axios
            .put(
                "http://localhost:8080/wsdlToTemplate/chooseOperation/"+operation,
                this.state.value,
                {headers: {"Content-Type": "text/plain"}}
            )
            .then(r => {
                this.setState({template: r.data});
                console.log(r.data)
            })
            .catch(e => console.log(e));
    }


    render() {
        const {responses} = this.state.response;
        
        return (
            <div>
        <form onSubmit={this.handleSubmit}>
            <label>
                
            <textarea value={this.state.value} rows="8" cols="100" onChange={this.handleChange}/>
            </label> <br/>
            <input type="submit" value="Submit WSDL" className="button"/>
        </form>
        <br/>

        <form onSubmit={this.handleOperationSubmit}>
          {this.state.response.map(response => (
            <div>
                <input type="radio" id={response} name="operations" value={response} onChange={this.handleRadioChange} />
                <label for={response}>{response}:</label>
            </div>
          ))}
            <input type="submit" value="Submit Operation + WSDL" className="button"></input>
        </form>
        <br/>
        <textarea value={this.state.template} rows="12" cols="100" onChange={this.handleChange}/>
{
        this.state.response.length > 0 ? 
        "hei" :
        ""
}
        </div>
        );
    }
}

export default WsdlForm
