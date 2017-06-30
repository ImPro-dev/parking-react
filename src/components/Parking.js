import React, { Component } from 'react';


class Parking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carTypes: ['Sedan', 'Disabled', 'Trucks'],
            slots: {
                Sedan: 15,
                Disabled: 5,
                Trucks: 10
            },
            typeChoose: '',
            reserveMessage: ''
        }

    };

    getTypes = () => {
        let {carTypes} = this.state;
        let types = '';
        carTypes.forEach((value, i, arr) => {
            types +=  value;
        });
        return types;
    };

    handleTypeChoose = (e) => {
        this.setState({typeChoose: e.target.value});
    };

    checkSlots = () => {
        let {slots, typeChoose} = this.state;
        if(typeChoose.length){
            if(slots[typeChoose] > 0){
                slots[typeChoose] -=1;
                this.setState({
                    slots: slots,
                    reserveMessage: 'You reserve a place'
                });
            } else {
                this.setState({
                    reserveMessage: 'All slots are busy'
                });
            }
        } else {
            this.setState({
                reserveMessage: ''
            });
        }
    };

    getFreeSlots = () => {
        let {slots} = this.state;
        let availableSlots = '|';
        for ( var type in slots) {
            availableSlots += type + ': ' + slots[type] + ' | ';
        }

        return availableSlots;
    };

    render() {

        return (
            <div className="parking">
                <h4>Free slots:</h4>
                <div className="free-slots">{this.getFreeSlots()}</div>
                <label>Your car type:</label>
                    <select onChange={this.handleTypeChoose}>
                        <option value=''>...choose...</option>
                        <option value={this.state.carTypes[0]}>{this.state.carTypes[0]}</option>
                        <option value={this.state.carTypes[1]}>{this.state.carTypes[1]}</option>
                        <option value={this.state.carTypes[2]}>{this.state.carTypes[2]}</option>
                    </select>
                    <button onClick={this.checkSlots}>Reserve Slot</button>
                <span>{this.state.reserveMessage}</span>
            </div>
        );
    }
}

export default Parking;
