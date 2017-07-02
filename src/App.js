import React, { Component } from 'react';
import Parking from './components/Parking';

class ParkingSystem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parkings: [],
            parkingScheme: [],
            cars: [],
            defaultParkingScheme: {
                Sedan: {free: 15, busy: 4},
                Track: {free: 10, busy: 1},
                Disabled: {free: 5, busy: 3},
            }
        }

    };

    // Create new parking
    createParking = () => {
        let parkings = Object.assign({}, this.state.parkings);
        let parkingScheme = Object.assign({}, this.state.parkingScheme);
        let defaultParkingScheme = Object.assign({}, this.state.defaultParkingScheme);
        let newId = this.getNewParkingID();
        parkings[newId] = newId;
        parkingScheme[newId] = defaultParkingScheme;
        this.setState({
            parkings: parkings,
            parkingScheme: parkingScheme
        });
    };

    // Get available parkings
    getParkingInstances = () => {
        let {parkings} = this.state;
        let parking = [];
        for(let parkingId in parkings) {
            parking.push(
                <Parking key={parkingId}
                         parkingId={parkingId}
                         addCarType={() => {this.addCarType(parkingId)}}
                         getParkingScheme={() => {this.getParkingScheme(parkingId)}}
                         scheme={this.state.parkingScheme[parkingId]}
                />
            );
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

    // Delete parking instance by ID
    deleteParking = () => {
        let numberInput = document.getElementById('parking-number');
        let parkingNumber = parseInt(numberInput.value, 10);
        let parkings = Object.assign({}, this.state.parkings);
        let parkingScheme = Object.assign({}, this.state.parkingScheme);

        if(parkingNumber) {
            if(parkings[parkingNumber]) {
                delete parkings[parkingNumber];
                delete parkingScheme[parkingNumber];
                this.setState({
                    parkings: parkings,
                    parkingScheme: parkingScheme
                });
                numberInput.value = '';
            } else {
                alert('Parking #' + parkingNumber + ' does not exist');
            }
        } else {
            alert('Enter valid Parking number');
        }
    };

    // Add new car type and associated slots
    addCarType = (parkingId) => {
        let carTypeInput = document.getElementById('cart-type' + parkingId);
        let slotsCountInput = document.getElementById('slots-count' + parkingId);
        let parkingScheme = Object.assign({}, this.state.parkingScheme);
        let carType, slotsCount = '';

        if(carTypeInput && slotsCountInput) {
            if(!carTypeInput.value.length || !slotsCountInput.value.length) {
                alert('Enter car type and slots count');
            }
            else if (Number(slotsCountInput.value) !== parseInt(slotsCountInput.value, 10)){
                alert('Enter valid slots count')
            } else {
                carType = carTypeInput.value;
                slotsCount = parseInt(slotsCountInput.value, 10);

                if(!parkingScheme[parkingId]) {
                    parkingScheme[parkingId] = {};
                }

                if(parkingScheme[parkingId][carType]) {
                    alert('This cart type already exist');
                } else {
                    parkingScheme[parkingId][carType] = {};
                    parkingScheme[parkingId][carType].free = slotsCount;
                    parkingScheme[parkingId][carType].busy = 0;
                }

                this.setState({
                    parkingScheme: parkingScheme
                });

                carTypeInput.value = '';
                slotsCountInput.value = '';
            }
        }
        return false;
    };

    // Get all car types with associated slots
    getParkingScheme = (parkingId) => {
        let parkingScheme = Object.assign({}, this.state.parkingScheme);
        return parkingScheme[parkingId];
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
