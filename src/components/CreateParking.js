import React, { Component } from 'react';


class CreateParking extends Component {
    render() {
        return (
            <div className="create-parking-form">
                <form>
                    <button>Add Slots</button>
                    <div>
                        <label>Car Type:</label>
                        <input type="text" />
                        <label>Slots Count:</label>
                        <input type="text" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateParking;
