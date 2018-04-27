import React, { Component } from 'react';
import './Components.css';
import {Button} from 'react-bootstrap';
import authFetch from '../utils/authFetch';

class ChoresApps extends Component{
    constructor(){
        super();
        this.state= {
            items: [],
            houseHoldInfo: {}
        };

        this.createItems = this.createItems.bind(this);
        this.save = this.save.bind(this);
        this.getItems = this.getItems.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
    }
    componentDidMount() {
        this.fetchUser();
        this.getItems();
    }

    async fetchUser() {
        const resp = await authFetch('/api/households');
        if(resp.ok) {
            this.setState({
                houseHoldInfo: await resp.json()
            });
        }
    }

    async getItems() {
        const resp = await authFetch('/api/households/chores');
        if(resp.ok) {
            const items = await resp.json();
            this.setState({items});
        }
    }

    async addItem(item, assign){
        const time = (new Date()).getTime();
        const tempItem = {name: item, id: time, checked: false, assign: {firstName: 'sending', lastName: ''}};
        this.setState((state) => ({
            items: [
                ...state.items,
                tempItem
            ]
        }));

        const resp = await authFetch('/api/households/chores', {
            name: item,
            assign: assign
        });

        if(resp.ok) {
            const newItem = await resp.json();
            this.setState((state) => {
                console.log(state);
                const i = state.items.indexOf(tempItem);
                state.items[i] = newItem;
                return state;
            });
        }
    }

    createItems(e){
        e.preventDefault();
        const item = this.refs.itemName.value;
        const assign = this.refs.assignName.value;
        if(typeof item === 'string' && item.length > 0) {
            this.addItem(item, assign);
            this.refs.itemForm.reset();
        }
    }

    save() {
        console.log(this.state.items);
    }

    toggleChecked(id, ix) {
        return ((e) => {
            e.preventDefault();
            const item = Object.assign({},  this.state.items[ix]);
            item.checked = !item.checked;
            const items = this.state.items;
            items[ix] = item;
            this.setState({items});
            authFetch(`/api/households/chores/${id}`, {
                checked: item.checked
            });
        });
    }

    render() {
        return(
                <div>
                    <table className="table table-hover">
                        <tr>
                            <th>Assigned to</th>
                            <th>Task</th>
                        </tr>
                    {
                        this.state.items.map((item, ix) => (<tr><td>{item.assign.firstName} {item.assign.lastName}</td><td onClick={this.toggleChecked(item.id, ix)}>
                            {item.checked ?
                             (<s> {item.name} </s>) :
                             item.name
                            }
                            </td></tr>))
                    }
                </table>
                <div className="component-wrapper">
                    <form className="form-inline" ref="itemForm" onSubmit={this.createItems}>
                        <div className="form-group">
                            <label htmlFor="Item">
                                New Item:
                                <input type="text" id="Item" placeholder="Ex: Milk" ref="itemName"
                                       className="form-control"/>
                            </label>
                             <select  ref="assignName">
                                  {
                                      this.state.houseHoldInfo.Users &&
                                    this.state.houseHoldInfo.Users.map(function(key) {
                                        return <option value={key.email}>{key.firstName} {key.lastName}</option>
                                    })
                                  }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChoresApps;
