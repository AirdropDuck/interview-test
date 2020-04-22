import React, { Component } from "react";

class Listitems extends Component {

    createItems(item) {
        return <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
    }

    render() {
        var entries = this.props.entries;
        var listItems = entries.map(this.createItems);
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>quantity</th>
                </tr>
                </thead>
                <tbody>
                {listItems}
                </tbody>
            </table>
        );
    }
};

export default Listitems;