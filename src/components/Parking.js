import React, { Component } from 'react';


class Parking extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    };

    getParkingSchemeForm = (parkingId) => {
        return (
            <div className="scheme-form">
                <span>
                    <label>Cart Type:</label>
                    <input type="text" id={'cart-type' + parkingId} />
                </span>
                <span>
                    <label>Slots Count:</label>
                    <input type="text" id={'slots-count' + parkingId} />
                </span>
                <button onClick={(parkingId) => this.props.addCarType(parkingId)} type="button">Add</button>
            </div>
        );
    };

    getParkingSchemeTable = () => {

        let scheme = this.props.scheme;
        let schemeTable = [];
        let count = 1;
        for(let carType in scheme) {
            schemeTable.push(
                <tr key={count}>
                    <td>{count}</td>
                    <td>{carType}</td>
                    <td>{scheme[carType]}</td>
                </tr>
            );
            count++;
        }

        return (
            <div className="scheme-table">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Cart Type</th>
                        <th>Slots Count</th>
                    </tr>
                    </thead>
                    <tbody>
                        {schemeTable}
                    </tbody>
                </table>
            </div>
        );
    };

    getVisualParking = () => {
        let slots = [];
        for(let carType in this.props.scheme) {
            for(let i = 1; i <= this.props.scheme[carType]; i++) {
                slots.push(
                    <span key={carType + i} className={carType}>{carType + ' ' + i}</span>
                )
            }
            slots.push(<div key={carType}><br /></div>);
        }
        return slots
    };

    render() {
        return (
            <div className="parking">
                <h3>{'Parking #' + this.props.parkingId}</h3>
                <div className="parking-scheme">
                    {this.getParkingSchemeForm(this.props.parkingId)}
                    {this.getParkingSchemeTable()}
                </div>
                <div className="cars">
                    <h4>Cars</h4>
                </div>
                <div className="visual-scheme">
                    <h4>Visual Scheme</h4>
                    {this.getVisualParking()}
                </div>
            </div>
        );
    }
}

export default Parking;
