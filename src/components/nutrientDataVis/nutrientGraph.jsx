import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTooltip, createContainer,

    VictoryArea, VictoryPolarAxis, VictoryTheme
} from 'victory';
import { alphaCompare } from '../../utils/GeneralUtils.jsx';


export default class NutrientGraph extends Component {
    constructor(props) {
        super(props);
        this.handleDomainChange = this.handleDomainChange.bind(this);
        this.state = {
            zoomDomain: null
        };
        this.zoomScaleFactor = 1;
        this.maxZoomDomain = null;
        this.minZoomDomain = {
            x: [0, 0],
            y: [0, 5e-2]
        };
    }

    static getVictoryData(foodData, name, color) {
        return Object.keys(foodData).map(key => {
            return { x: key, y: foodData[key], name: name, color: color };
        });
    }
    static getFoodNutrients(food, nutrientKey) { return food.n[nutrientKey]; }

    static transformObjectToVictoryXYArray(obj, name) {
        debugger;
        let arrData = Object.keys(obj).sort(alphaCompare).map(key => {
            return { x: key, y: obj[key], name: name };
        });
        // if (arrData.length === 1) {
        //     arrData.push({ x: 0, y: 0, name: name }); //if only 1 entry then VictoryArea will crash. Add dummy value at center
        // }
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

        let displayVal = `${val.toFixed(1)} ${unit}`;
        if (d.nutrientDataIsMissing) displayVal = 'Data Missing';
        // else if (val === 0) `0 Grams`;

        return `${d.foodName}: \n${d.x}: ${displayVal}`;
    }


    async handleDomainChange(domain, props) {
        if (!this.state.zoomDomain) {
            await this.setState({zoomDomain: domain});
            this.maxZoomDomain = domain;
        }
        // console.log(domain,this.state.zoomDomain)
        //find the diff in zoom states
        let newD = domain;
        let oldD = this.state.zoomDomain;
        let xDiff = [newD.x[0] - oldD.x[0], newD.x[1] - oldD.x[1]];
        let yDiff = [newD.y[0] - oldD.y[0], newD.y[1] - oldD.y[1]];

        //magnify the diffs
        const scale = (x) => x * this.zoomScaleFactor;
        xDiff = xDiff.map(scale);
        yDiff = yDiff.map(scale);

        //apply the magnified diff
        newD.x = [oldD.x[0] + xDiff[0], oldD.x[1] + xDiff[1]]
        newD.y = [oldD.y[0] + yDiff[0], oldD.y[1] + yDiff[1]]

        //ensure not out of bounds of max/min zoom
        newD.x = [Math.min(newD.x[0], this.maxZoomDomain.x[0]), Math.min(newD.x[1], this.maxZoomDomain.x[1])];
        newD.y = [Math.min(newD.y[0], this.maxZoomDomain.y[0]), Math.min(newD.y[1], this.maxZoomDomain.y[1])];
        newD.x = [Math.max(newD.x[0], this.minZoomDomain.x[0]), Math.max(newD.x[1], this.minZoomDomain.x[1])];
        newD.y = [Math.max(newD.y[0], this.minZoomDomain.y[0]), Math.max(newD.y[1], this.minZoomDomain.y[1])];

        // console.log(newD)
        //set zoom state to new magnification
        this.setState({zoomDomain: newD});
    }

    render() {
        const selectedFoods = this.props.selectedFoods,
            nutrientDataKey = this.props.nutrientDataKey,
            w = 200,
            h = 200;

        const axisStyle = {
            axis: { stroke: "none" },
            ticks: { stroke: "grey", size: 3 },
            tickLabels: { fontSize: 5, padding: 1 },
        };

        const radars = selectedFoods.map((food) => {
            let data = NutrientGraph.getFoodNutrients(food, nutrientDataKey);
            // const keys = Object.keys(data).sort(alphaCompare);
            // data = NutrientGraph.transformObjectToVictoryXYArray(data, food.name);

            if (data.length === 0) return null; //if no values in VictoryArea = crash
            return (
                <VictoryArea
                    key={food.name}
                    data={data}
                    // categories={{ x: keys }} // Controls ordering
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
                        dimension="x"
                        zoomDimension='y' //ensure X zooming does not mess up the enchanced zooming
                        zoomDomain={this.state.zoomDomain}
                        // onZoomDomainChange={(domain, props) => this.handleDomainChange(domain, props)}
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
                    tickFormat={() => null}
                />
                <VictoryPolarAxis
                    style={axisStyle} />
                {radars}
            </VictoryChart>
        );
    }
}
