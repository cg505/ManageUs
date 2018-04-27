import React, { Component } from 'react';
import './Components.css';
import authFetch from "../utils/authFetch";

class GroceryApps extends Component{
    constructor(){
        super();
        this.state= {
            items: ["Milk", ],
            grocery: [],
        };

        this.createItems = this.createItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.fetchItem = this.fetchItem.bind(this);
    }

    componentDidMount() {
        this.fetchItem();
    }

    async addItem(item){

        this.setState({items: [...this.state.items, item]});
        await authFetch('/api/households/groceries', {
            name: item});
        //console.log(item);
    }

    createItems(e){
        e.preventDefault();
        const item = this.refs.itemName.value;
        if(typeof item === 'string' && item.length > 0) {
            this.addItem(item);
            this.refs.itemForm.reset();
        }
    }

    async fetchItem() {
        const resp = await authFetch('/api/households/groceries');
        if (resp.ok) {
            this.setState({
                grocery: await resp.json()
            });
            console.log(this.state.grocery);
            }

    }

    render() {
        return(
            <div>
                <table className="table table-hover">
                        <tr>
                            <th>Item</th>
                        </tr>
                {
                    this.state.grocery.map(function(key){
                        if(key.name){
                            return <tr><td>
                                {key.name}
                            </td></tr>
                        }
                        return <tr><td>
                            nothing here
                        </td></tr>;
                    })

                }
                </table>
                <div className="component-wrapper">
                    <form className="form-inline" ref="itemForm" onSubmit={this.createItems}>
                        <div className="form-group">
                            <label htmlFor="Item">
                                Item Name
                                <input type="text" id="Item" placeholder="add item name" ref="itemName"
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
