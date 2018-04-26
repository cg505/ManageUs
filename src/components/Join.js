import React, { Component } from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    Button
} from 'react-bootstrap';
import authFetch from '../utils/authFetch';
import joinImage from '../img/join.png';

class Join extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: '',
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this.setState({
            key: e.target.value
        });
    }

    async submit(e) {
        e.preventDefault();

        const resp = await authFetch('/api/households/join', {
            key: this.state.key
        });

        if(!resp.ok) {
            this.setState({
                error: resp.status
            });
        }

        this.props.fetchHousehold();
    }

    render() {
        return (
            <div className="flex-item join">
                {
                    this.state.error &&
                    (<p>{this.state.error}</p>)
                }
                <h3><img src={joinImage} alt="joinImage" /> Join a Household</h3>
                <Form inline onSubmit={this.submit}>
                    <FormGroup>
                        <FormControl type="text" placeholder="Key" onChange={this.handleChange} value={this.state.key} />
                    </FormGroup>{' '}
                    <Button type="submit">
                        Join
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Join;
