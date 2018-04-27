import React, { Component } from 'react';
import './Components.css';
import {Button} from 'react-bootstrap';
class GroceryApps extends Component{
    constructor(){
        super();
        this.state= {
            items: {

            },


        };
        this.createItems = this.createItems.bind(this);
        this.save = this.save.bind(this);
    }


    addItem(item){
        var time = (new Date()).getTime();
        this.state.items['item-' + time] = item;
        this.setState({items: this.state.items});
    }

    createItems(e){
        e.preventDefault();
        var item = this.refs.itemName.value;
        if(typeof item === 'string' && item.length > 0) {
            this.addItem(item);
            this.refs.itemForm.reset();
        }
    }

    async save() {
        console.log(this.state.items);
    }

    render() {
        return(
            <div className="component-wrapper">
                <div className="table table-hover">
                    <ul className="list-group text-center">
                        {
                            Object.keys(this.state.items).map(function(key){
                                return <li className="list-group-item list-group-item-info">
                                    {this.state.items[key]}
                                </li>
                            }.bind(this))
                        }
                    </ul>
                </div>
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
                <div className="edit-button" >
                    <Button bsStyle="info" onClick={this.save}>Save</Button>
                </div>
            </div>
        );
    }

}


export default GroceryApps;