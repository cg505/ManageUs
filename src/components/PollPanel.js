import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import PollImage from '../img/poll.png';
import PollApps from './PollApps';
import authFetch from "../utils/authFetch";

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

class PollPanel extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            Polls: []
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getQues = this.getQues.bind(this);
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

    componentDidMount() {
        this.getQues();
    }

    async getQues() {
        const resp = await authFetch('/api/households/polls');
        if(resp.ok) {
            const ques = await resp.json();
            this.setState({
                Polls: ques,
            });
            console.log(this.state.Polls);
        }
    }

    render() {
        let lastEditor = '';
        return (
            <div>
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                    <h1><img src={PollImage} alt="PollImage" /> Polls</h1>
                    <table className="table table-hover">
                            <div>
                                <PollApps />
                            </div>
                    </table>
                </Modal>
                <div className="flex-item" id="Polls" onClick={this.openModal}>{
                    this.state.Polls.map((key) => {

                        return lastEditor = key.creator.firstName;
                    })

                }
                    <div className = "flex-item-header">
                        <img src={PollImage} alt="PollImage" />
                        <h4>Poll</h4>
                    </div>
                    <span className="label label-warning">{this.state.Polls.length} Current Polls</span>
                    <h5 className="mb-1">Polls</h5>
                    <p className="mb-1">Last Edited</p>
                    <small>by {lastEditor}</small>
                </div>
            </div>
        );
    }
}
export default PollPanel;
