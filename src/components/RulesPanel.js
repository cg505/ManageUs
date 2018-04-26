import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import RulesImage from '../img/rules.png';
import {Button} from 'react-bootstrap';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        height                : 'auto',
        width                 : 'auto',
        maxWidth              : '800px',
        transform             : 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class RulesPanel extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            editRuleIsOpen: false,
            ruleText: 'The Rules for this household will go as such. There will be noise. There will be no friends. There will be no left out food. There will be taco tuesdays. There will be no partys. And there shant be any celebrations.'
        };


        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openEditRule = this.openEditRule.bind(this);
        this.closeEditRule = this.closeEditRule.bind(this);
        this.Save = this.Save.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openEditRule() {
        this.setState({editRuleIsOpen: true});
    }

    closeEditRule() {
        this.setState({editRuleIsOpen: false});
    }

    Save() {
        console.log("Save");
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                    <h1><img src={RulesImage} alt="RulesImage" /> Rules</h1>
                    <table className="table table-hover">
                        <tr>
                            <td>{this.state.ruleText}</td>
                        </tr>
                    </table>
                    <div className="edit-button" onClick={this.openEditRule}>
                        <Button bsStyle="info">Edit</Button>
                    </div>
                </Modal>

                <Modal isOpen={this.state.editRuleIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeEditRule} style={customStyles} contentLabel="edit Modal">
                    <tr>
                        <textarea type="text" value={this.state.ruleText} onChange={e => this.setState({ruleText: e.target.value})}/>
                    </tr>
                    <div className="edit-button" onClick={this.Save}>
                        <Button bsStyle="info" onClick={this.closeEditRule}>Save</Button>
                    </div>
                </Modal>

                <div className="flex-item" id="Rules" onClick={this.openModal}>
                    <div className = "flex-item-header">
                        <img src={RulesImage} alt="RulesImage"/>
                        <h4>Rules</h4>
                    </div>
                    <span className="label label-info">Last Editied: 4/20/18</span>
                    <h5 className="mb-1">Rules List</h5>
                    <p className="mb-1">add some thing here</p>
                    <small>by XXX</small>
                </div>
            </div>
        );
    }
}
export default RulesPanel;
