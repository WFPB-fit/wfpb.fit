import React, { Component } from 'react';
import {
    VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel,
    VictoryTooltip, VictoryLine, createContainer
} from 'victory';


export default class NutrientGraph extends Component {
    constructor(props) {
        super(props);
    }

	static getVictoryData(foodData, name, color) {
		return Object.keys(foodData).map(key => {
			return { x: key, y: foodData[key], name: name, color: color };
		});
	}
    static getFoodNutrients(food, nutrientKey) { return food.nutrients[nutrientKey]; }

    static getVictoryTooltipLabel(d) {
        let val = Number(d.y);
        let unit = d.yLabel;

        if (!unit) {
            if (d.y < 1e-3) { val *= 1e6; unit = 'MicroGrams'; }
            else if (d.y < 1) { val *= 1e3; unit = 'MilliGrams'; }
            else { unit = 'Grams'; }
        }
        return `${d.name}: \n${d.x}: ${val.toFixed(1)} ${unit}`
    }

    render() {
        const selectedFoods = this.props.selectedFoods,
            title = this.props.title,
            nutrientDataKey = this.props.nutrientDataKey,
            w = 200,
            h = 200;
            
        const selectDataColor = function (d, active) { return d.color; };
        const axisStyle = {
            ticks: { stroke: "grey", size: 3 },
            tickLabels: { fontSize: 5, padding: 1 },
        };
        let xAxisStyle = Object.assign({}, axisStyle);
        xAxisStyle.tickLabels.textAnchor = 'start';
        xAxisStyle.tickLabels.angle = 45;

        const lines = selectedFoods.map(food => {
            return (
                <VictoryLine
                    key={food.name}
                    data={NutrientGraph.getVictoryData(NutrientGraph.getFoodNutrients(food, nutrientDataKey), food.name, food.color)}
                    style={{
                        data: {
                            stroke: food.color,
                            strokeWidth: (d, active) => { return active ? 2 : 1; }
                        }
                    }}
                />
            )
        });

        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

        return (
            <VictoryChart height={h} width={w}
                domainPadding={{ y: 10 }}
                padding={{ bottom: 50, left: 20, right: 20, top: 10 }}
                containerComponent={
                    //setup tool tip
                    <VictoryZoomVoronoiContainer
                        dimension="x"
                        labels={NutrientGraph.getVictoryTooltipLabel}
                        labelComponent={
                            <VictoryTooltip
                                style={{
                                    fontSize: 4,
                                    padding: 2
                                }}
                                cornerRadius={5}
                                flyoutStyle={{ fill: "white" }}
                            />}
                    />
                }
            >
                <VictoryLabel
                    x={w / 2} y={10}
                    text={title}
                    textAnchor='middle'
                />
                <VictoryAxis independentAxis
                    style={axisStyle}
                />
                <VictoryAxis dependentAxis
                    style={xAxisStyle}
                />
                <VictoryLegend x={w * 0.7} y={20}
                    orientation="vertical"
                    gutter={5}
                    style={{
                        labels: { fontSize: 4 },
                        data: { stroke: selectDataColor, fill: selectDataColor }
                    }}
                    data={selectedFoods}
                />
                {lines}
            </VictoryChart>
        );
    }
}
