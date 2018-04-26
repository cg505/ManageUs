import React, { Component } from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    Button
} from 'react-bootstrap';
import authFetch from '../utils/authFetch';
import createImage from '../img/create.png';

class CreateHousehold extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    async submit(e) {
        e.preventDefault();

        const resp = await authFetch('/api/households', {
            name: this.state.name
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
            <div className="flex-item create">
                {
                    this.state.error &&
                    (<p>{this.state.error}</p>)
                }
                <h3><img src={createImage} alt="createImage" /> Create a Household</h3>
                <Form inline onSubmit={this.submit}>
                    <FormGroup>
                        <FormControl type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
                    </FormGroup>{' '}
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        )
    }
}

export default CreateHousehold;
