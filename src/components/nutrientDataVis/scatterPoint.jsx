import React, { Component } from 'react';

//Display an X if nutrientDataIsMissing, else hide the point
export default class ScatterPoint extends React.Component {
    render() {
        const { x, y, datum } = this.props; // VictoryScatter supplies x, y and datum
        const text = datum.nutrientDataIsMissing ?  "✖️" : "";
        const fontSize = 10;
        
        return (
            <text /*style={{color: datum.dataColor}}*/ x={x-fontSize/2.5} y={y+fontSize/3} fontSize={fontSize}>
                {text}
            </text>
        );
    }
}