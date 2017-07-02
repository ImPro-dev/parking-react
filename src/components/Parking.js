import React, { Component } from 'react';


class Parking extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    };

    componentWillMount  = () => {
        let scheme = this.props.scheme;
        this.setState({
            test: 2
        })
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
                    <td>{scheme[carType].free}</td>
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
            let status = 'free';
            let sumSlots = this.props.scheme[carType].free + this.props.scheme[carType].busy;
            for(let i = 1; i <= sumSlots; i++) {
                status = (i > this.props.scheme[carType].free) ? 'busy' : status;
                slots.push(
                    <span key={carType + i} className={carType + ' ' + status}>
                        {carType + ' ' + i}
                        <strong>&lt;{status}&gt;</strong>
                    </span>
                )
            }
            slots.push(<div key={carType}><br /></div>);
        }
        return slots
    };

    render() {
        return (
            <div className="parking">
                <h2>{'Parking #' + this.props.parkingId}</h2>
                <div className="parking-scheme">
                    <h4>Parking Scheme</h4>
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
