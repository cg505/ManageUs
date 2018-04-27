import React, { Component } from 'react';
import './Components.css';
import authFetch from '../utils/authFetch';

class GroceryApps extends Component{
    constructor(){
        super();
        this.state= {
            items: []
        };

        this.createItems = this.createItems.bind(this);
        this.save = this.save.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    async getItems() {
        const resp = await authFetch('/api/households/groceries');
        if(resp.ok) {
            const items = await resp.json();
            this.setState({items});
        }
    }

    async addItem(item){
        const time = (new Date()).getTime();
        const tempItem = {name: item, id: time, checked: false};
        this.setState((state) => ({
            items: [
                ...state.items,
                tempItem
            ]
        }));

        const resp = await authFetch('/api/households/groceries', {
            name: item
        });

        if(resp.ok) {
            const newItem = await resp.json();
            this.setState((state) => {
                const i = state.items.indexOf(item);
                state[i] = newItem;
                return state;
            });
        }
    }

    createItems(e){
        e.preventDefault();
        const item = this.refs.itemName.value;
        if(typeof item === 'string' && item.length > 0) {
            this.addItem(item);
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
            authFetch(`/api/households/groceries/${id}`, {
                checked: item.checked
            });
        }).bind(this);
    }

    render() {
        return(
                <div>
                    <table className="table table-hover">
                        <tr>
                            <th>Item</th>
                        </tr>
                    {
                        this.state.items.map((item, ix) => (<tr><td onClick={this.toggleChecked(item.id, ix)}>
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
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default GroceryApps;
