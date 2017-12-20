import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTooltip, createContainer,

    VictoryArea, VictoryPolarAxis, VictoryTheme
} from 'victory';
import { alphaCompare } from '../utils/GeneralUtils.jsx';


export default class NutrientGraph extends Component {
    static getVictoryData(foodData, name, color) {
        return Object.keys(foodData).map(key => {
            return { x: key, y: foodData[key], name: name, color: color };
        });
    }
    static getFoodNutrients(food, nutrientKey) { return food.nutrients[nutrientKey]; }

    static transformObjectToVictoryXYArray(obj, name) {
        let arrData = Object.keys(obj).sort(alphaCompare).map(key => {
            return { x: key, y: obj[key], name: name };
        });
        if (arrData.length === 1) {
            arrData.push({ x: 0, y: 0, name: name }); //if only 1 entry then VictoryArea will crash. Add dummy value at center
        }
        return arrData;
    }

    static getVictoryTooltipLabel(d) {
        let val = Number(d.y);
        let unit = d.yLabel;

        if (!unit) {
            if (d.y < 1e-3) { val *= 1e6; unit = 'MicroGrams'; }
            else if (d.y < 1) { val *= 1e3; unit = 'MilliGrams'; }
            else { unit = 'Grams'; }
        }
        if (d.x === 0) return 'Ignore me, I am a hack to get the graph to work';
        return `${d.name}: \n${d.x}: ${val.toFixed(1)} ${unit}`
    }


    render() {
        const selectedFoods = this.props.selectedFoods,
            nutrientDataKey = this.props.nutrientDataKey,
            w = 200,
            h = 200;

        const selectDataColor = function (d, active) { return d.color; };
        const axisStyle = {
            axis: { stroke: "none" },
            ticks: { stroke: "grey", size: 3 },
            tickLabels: { fontSize: 5, padding: 1 },
        };

        const radars = selectedFoods.map((food) => {
            let data = NutrientGraph.getFoodNutrients(food, nutrientDataKey);
            const keys = Object.keys(data).sort(alphaCompare);
            data = NutrientGraph.transformObjectToVictoryXYArray(data, food.name);

            if(data.length===0) return null; //if no values in VictoryArea = crash
            return (
                <VictoryArea
                    key={food.name}
                    data={data}
                    categories={{ x: keys }} // Controls ordering
                    style={{
                        data: { fill: food.color, fillOpacity: 0.2, },
                    }}
                />
            )
        });
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

        return (
            <VictoryChart
                // height={h} width={w}
                polar
                theme={VictoryTheme.material}
                domainPadding={{ y: 10 }}
                padding={40}
                containerComponent={
                    //setup tool tip
                    <VictoryZoomVoronoiContainer
                        allowPan
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
                <VictoryPolarAxis dependentAxis
                    style={axisStyle}
                // tickFormat={() => null} 
                />
                <VictoryPolarAxis
                    style={axisStyle} />
                {radars}
            </VictoryChart>
        );
    }
}
