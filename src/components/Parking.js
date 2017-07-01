import React, { Component } from 'react';


class Parking extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    };

    render() {

        return (
            <div className="parking">
                <h3>{'Parking #' + this.props.parking.id}</h3>
            </div>
        );
    }
}

export default Parking;
