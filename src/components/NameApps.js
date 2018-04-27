import React, { Component } from 'react';
import './Components.css';
import authFetch from "../utils/authFetch";

class NameApps extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            houseHoldInfo: null,
        };

        this.fetchUser = this.fetchUser.bind(this);
    }
    componentDidMount() {
        this.fetchUser();
    }

    async fetchUser() {
        const resp = await authFetch('/api/households');
        if(resp.ok) {
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
        return(
            <div>
            <table className="table table-hover">
                        <tr>
                            <th>Name</th>
                        </tr>
                {
                    this.state.items.map(function(key){
                        return <tr>
                            <td>
                                {key.firstName} {key.lastName}
                            </td>
                        </tr>
                    })
                }
                </table>
            </div>
        )
    }
}

export default NameApps;
