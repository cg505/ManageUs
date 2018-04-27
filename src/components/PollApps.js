import React, { Component } from 'react';
import './Components.css';
import authFetch from '../utils/authFetch';

class PollApps extends Component {
    constructor() {
        super();
        this.state = {
            Polls: []
        };

        this.createPolls = this.createPolls.bind(this);
        this.getQues = this.getQues.bind(this);
        this.chooseA = this.chooseA.bind(this);
        this.chooseB = this.chooseB.bind(this);
        this.chooseC = this.chooseC.bind(this);
        this.chooseD = this.chooseD.bind(this);
    }

    createPolls(e){
        e.preventDefault();
        const ques = this.refs.quesName.value;
        const choiceA = this.refs.choiceAName.value;
        const choiceB = this.refs.choiceBName.value;
        const choiceC = this.refs.choiceCName.value;
        const choiceD = this.refs.choiceDName.value;
        //console.log(ques + choiceA + choiceB + choiceC + choiceD);
        if(typeof ques === 'string' && ques.length > 0) {
            this.addQues(ques, choiceA, choiceB, choiceC, choiceD);
            this.refs.quesForm.reset();
            this.refs.quesForm.reset();
        }
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

    async addQues(ques, choiceA, choiceB, choiceC, choiceD) {

        const resp = await authFetch('/api/households/polls', {
            question: ques,
            choiceA: choiceA,
            choiceB: choiceB,
            choiceC: choiceC,
            choiceD: choiceD,
        });

        if(resp.ok) {
            await resp.json();
        }
    }


    chooseA(id) {
        return () => (authFetch('/api/households/polls/' + id + '/vote', {
            choice: "A"
        }));
    }

    chooseB(id) {
        return () => (authFetch('/api/households/polls/' + id + '/vote', {
            choice: "B"
        }));
    }

    chooseC(id) {
        return () => (authFetch('/api/households/polls/' + id + '/vote', {
            choice: "C"
        }));
    }

    chooseD(id) {
        return () => (authFetch('/api/households/polls/' + id + '/vote', {
            choice: "D"
        }));
    }




    render() {
        return(
            <div>

                <div className="component-wrapper">
                    <tr>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                    </tr>
                        {this.state.Polls.map(((key) => {
                            return <tr>
                                <td>{key.creator.firstName} {key.creator.lastName}</td>
                                <td>{key.question}</td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={this.chooseA.bind(this)(key.id)}>{key.choiceA}</button>
                                    <span className="label label-success">{key.countA}</span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={this.chooseB.bind(this)(key.id)}>{key.choiceB}</button>
                                    <span className="label label-success">{key.countB}</span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={this.chooseC.bind(this)(key.id)}>{key.choiceC}</button>
                                    <span className="label label-success">{key.countC}</span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={this.chooseD.bind(this)(key.id)}>{key.choiceD}</button>
                                    <span className="label label-success">{key.countD}</span>
                                </td>
                            </tr>
                        }))
                        }
                    <form className="form-inline" ref="quesForm" onSubmit={this.createPolls}>
                        <div className="form-group">
                            <label htmlFor="Item">
                                New Question:
                                <input type="text" id="Item" placeholder="Ex: Where to eat" ref="quesName"
                                       className="form-control"/>
                                Options:
                                <input type="text" id="Item" placeholder="Ex: five guys" ref="choiceAName"
                                       className="form-control"/>
                                <input type="text" id="Item" placeholder="Ex: XXX" ref="choiceBName"
                                       className="form-control"/>
                                <input type="text" id="Item" placeholder="Ex: Wiley" ref="choiceCName"
                                       className="form-control"/>
                                <input type="text" id="Item" placeholder="Ex: Windsor" ref="choiceDName"
                                       className="form-control"/>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>

            </div>
        )
    }

}

export default PollApps;