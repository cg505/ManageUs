import React, {Component} from 'react';
import {Grid, Col, Row} from "react-bootstrap";
import Grocery from "./Grocery";
import Chores from "./Chores";
import Notes from "./Notes";
import Polls from "./Polls";
import Rules from "./Rules";
class base extends Component {
    render() {
        return (gridInstance);
    }
}
const gridInstance =(
    <Grid>
        <div className="list-group" id="list-tab">
            <div className="container">
                <Row className="show-grid">
                    <Col sm={6} md={3}>
                        <Grocery />
                    </Col>
                    <Col sm={6} md={3}>
                        <Chores />
                    </Col>
                    <Col sm={6} md={3}>
                        <Notes />
                    </Col>
                    <Col sm={6} md={3}>
                        <Polls />
                    </Col>
                    <Col sm={6} md={3}>
                        <Rules />
                    </Col>
                </Row>
            </div>
        </div>
    </Grid>
);
export default base;