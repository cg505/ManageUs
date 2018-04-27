import React, { Component } from 'react';
import './Components.css';
import Modal from 'react-modal';
import HouseImage from '../img/house.png';
import NameApps from './NameApps';
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


//TODO: Change info to pull from database
class NamesPanel extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            houseHoldInfo: null,
            items: [],

        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
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
        this.fetchUser();
    }

    async fetchUser() {
        const resp = await authFetch('/api/households');
        if (resp.ok) {
            this.setState({
                houseHoldInfo: await resp.json()
            });

            if(this.state.houseHoldInfo) {
                let temp = this.state.houseHoldInfo.Users;
                this.setState({
                    items: temp
                });
            }
        }
    }


    render() {
        let houseName = "Our House";
        let numpeople = 0;
        if(this.state.houseHoldInfo){
            houseName = this.state.houseHoldInfo.name;
        }
        return (
            <div>
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                    <h1><img src={HouseImage} alt="HouseImage" /> {houseName}</h1>
                    <table className="table table-hover">
                        <tr>
                            <th>Name</th>
                        </tr>
                        <NameApps/>
                    </table>
                </Modal>
                <div className="flex-item" id="Chores" onClick={this.openModal}>
                    <div className="flex-item-header">
                        <img src={HouseImage} alt="HouseImage" />
                        <h4>{houseName}</h4>
                    </div>
                    <div>
                        {
                            this.state.items.map(function (key) {
                                numpeople++;
                                return <h5>
                                    {key.firstName} {key.lastName}
                                </h5>
                            })
                        }
                        <span className="label label-default">{numpeople} People</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default NamesPanel;

