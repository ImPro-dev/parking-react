import React, { Component } from 'react';


class Parking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carTypes: ['Sedan', 'Disabled', 'Truck'],
            slots: {
                Sedan: 15,
                Disabled: 5,
                Truck: 10
            },
            typeChoose: '',
            reserveMessage: ''
        }

    };

    slotReserved = (slots) => {
        this.setState({
            slots: slots,
            reserveMessage: 'You are reserve a slot'
        });
    };

    slotNotReserved = () => {
        this.setState({
            reserveMessage: 'All slots are busy'
        });
    };

    handleTypeChoose = (e) => {
        this.setState({typeChoose: e.target.value});
    };

    checkSlots = () => {
        let {slots, typeChoose} = this.state;
        let reserved = false;
        if(typeChoose.length) {
            if(slots[typeChoose] > 0){
                slots[typeChoose] -=1;
                this.slotReserved(slots);

            } else if(typeChoose == 'Disabled') {
                if(slots['Sedan'] > 0) {
                    slots['Sedan'] -=1;
                    this.slotReserved(slots);
                } else if(slots['Truck'] > 0) {
                    slots['Truck'] -=1;
                    this.slotReserved(slots);
                } else {
                    this.slotNotReserved();
                }
            }
            else if(typeChoose == 'Sedan') {
                if(slots['Truck'] > 0) {
                    slots['Truck'] -=1;
                    this.slotReserved(slots);
                } else {
                    this.slotNotReserved();
                }
            }
            else {
                this.slotNotReserved();
            }
        } else {
            this.setState({
                reserveMessage: ''
            });
        }
    };

    getParkingStatus = () => {
        return this.state.slots;
    };

    freeSedan = () => {
        return this.state.slots['Sedan'];
    };
    freeDisabled = () => {
        return this.state.slots['Disabled'];
    };
    freeSedan = () => {
        return this.state.slots['Trucks'];
    };

    getFreeSlots = () => {
        let {slots} = this.state;
        let availableSlots = '| ';
        for ( var type in slots) {
            availableSlots += type + ': ' + slots[type] + ' | ';
        }

        return availableSlots;
    };

    getTypes = () => {
        let {carTypes} = this.state;
        let types = carTypes.map((value, index) => {
            return <option key={index} value={value}>{value}</option>;
        });
        return types;
    };

    render() {

        return (
            <div className="parking">
                <h4>Free slots:</h4>
                <div className="free-slots">{this.getFreeSlots()}</div>
                <label>Your car type:</label>
                <select onChange={this.handleTypeChoose}>
                    <option value="">...select...</option>
                    {this.getTypes()}
                </select>
                <button onClick={this.checkSlots}>Reserve Slot</button>
                <span>{this.state.reserveMessage}</span>
            </div>
        );
    }
}

export default Parking;
