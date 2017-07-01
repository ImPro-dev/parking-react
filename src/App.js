import React, { Component } from 'react';
import Parking from './components/Parking';

class ParkingSystem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parkings: [],
            parkingBlank:{
                id: null,
                carTypes: [],
                slots: {}
            }
        }

    };

    createParking = () => {
        let newParking = Object.assign({}, this.state.parkingBlank);
        let parkings = Object.assign({}, this.state.parkings);
        newParking.id = this.getNewParkingID();
        parkings[newParking.id] = newParking;
        this.setState({
            parkings: parkings
        });
    };

    getParkingInstances = () => {
        let {parkings} = this.state;
        let parking = [];
        for(let parkingId in parkings) {
            parking.push(<Parking key={parkingId} parking={parkings[parkingId]} />);
        }
        return parking;
    };

    // Creating ID for new parking instance
    getNewParkingID = () => {
        let ids = [];
        let parkings = Object.assign({}, this.state.parkings);
        for(let parkingId in parkings) {
            ids.push(parkingId);
        }
        return ids.length ? Math.max.apply(null, ids) + 1 : 1;
    };

    deleteParking = () => {
        let numberInput = document.getElementById('parking-number');
        let parkingNumber = parseInt(numberInput.value, 10);
        let parkings = Object.assign({}, this.state.parkings);

        if(parkingNumber) {
            if(parkings[parkingNumber]) {
                delete parkings[parkingNumber];
                this.setState({
                    parkings: parkings
                });
                numberInput.value = '';
            } else {
                alert('Parking #' + parkingNumber + ' does not exist');
            }
        } else {
            alert('Enter valid Parking number');
            return;
        }
    };

    render() {
        return (
            <div className="App">
                <h2>Parking Admin System</h2>
                <button onClick={()=>this.createParking()}>Create New Parking</button>
                <span className="delete-parking">
                    <label>Delete parking # </label>
                    <input type="text" id="parking-number" placeholder="Enter parking number" />
                    <button className="test" onClick={()=>this.deleteParking()}>Delete</button>
                </span>
                <div className="parkings">{this.getParkingInstances()}</div>
            </div>
        );
    }
}

export default ParkingSystem;
