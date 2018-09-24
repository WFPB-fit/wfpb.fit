import React, { Component } from "react";
import {
	VictoryChart,
	VictoryTooltip,
	createContainer,
	VictoryLine,
	VictoryVoronoiContainer,
	VictoryAxis,
	VictoryArea,
	VictoryPolarAxis,
	VictoryTheme,
	VictoryScatter
} from "victory";
import { alphaCompare, WidthWrapper } from "../../utils/GeneralUtils.jsx";
import ScatterPoint from "./scatterPoint.jsx";

const MAX_LABEL_LEN = 10;

export default class NutrientGraph extends Component {
	static yTickFormat(t) {
		t = parseFloat(t);
		if (t < 1e-2 || t > 1e3) {
			return t.toExponential();
		}
		return t;
	}
	static processGraphLabel(label) {
		if (label.length > MAX_LABEL_LEN * 2) {
			label = label.substring(0, MAX_LABEL_LEN) + "..." + label.substring(label.length - MAX_LABEL_LEN - 1, label.length);
        }
		return label;
	}
	constructor(props) {
		super(props);
	}

	static getVictoryData(foodData, name, color) {
		return Object.keys(foodData).map(key => {
			return { x: key, y: foodData[key], name: name, color: color };
		});
	}
	// static getFoodNutrients(food, nutrientKey) {
	//     if (nutrientKey != null){
	//         return food.n[nutrientKey];
	//     }
	//     return food;
	// }

	static transformObjectToVictoryXYArray(obj, name) {
		debugger;
		let arrData = Object.keys(obj)
			.sort(alphaCompare)
			.map(key => {
				return { x: key, y: obj[key], name: name };
			});
		// if (arrData.length === 1) {
		//     arrData.push({ x: 0, y: 0, name: name }); //if only 1 entry then VictoryArea will crash. Add dummy value at center
		// }
		return arrData;
	}

	static getVictoryTooltipLabel(d) {
		let val = Number(d.y);
		let unit = d.unit;

		let prefix = "";
		if (!unit) {
			unit = "";
        }

        const valDecimal = ( val - parseInt(val) )
		let magnitude = - parseInt( valDecimal.toExponential().split('e')[1] );
		magnitude = Math.max(magnitude, 1);

		let displayVal = `${val.toFixed(magnitude)} ${prefix}${unit}`;
		if (d.nutrientDataIsMissing) displayVal = "Data Missing";

		// return `${d.foodName} : ${displayVal}`;
		return '';
	}
	
	getVictoryGraphLines(linesData) {
		return linesData.map(line => {
			// const keys = Object.keys(data).sort(alphaCompare);
			// data = NutrientGraph.transformObjectToVictoryXYArray(data, food.name);

			if (line.dataPoints.length === 0) return null; //if no values in VictoryArea = crash
			return (
				<VictoryLine
					key={line.id}
					style={{
						data: { stroke: line.color }
					}}
					data={line.dataPoints}
				/>
			);
		});
	}

	getVictoryGraphPoints(linesData) {
		return linesData.map(line => {
			if (line.dataPoints.length === 0) return null; //if no values in VictoryArea = crash

			return (
				<VictoryScatter
					name="missingData"
					data={line.dataPoints}
					key={line.id}
					dataComponent={<ScatterPoint />}
					size={3}
					style={{
						data: { fill: line.color }
					}}
				/>
			);
		});
	}

	render() {
		const linesData = this.props.linesData,
			w = 200,
			h = 200;

		const axisStyle = {
			axis: { stroke: "none" },
			ticks: { stroke: "grey", size: 3 },
			tickLabels: { fontSize: 5, padding: 1 }
		};

		const yLabel =
			typeof this.props.yLabel === "string" ? this.props.yLabel : "Grams";

		return (
			<WidthWrapper>
				<VictoryChart  //SVG child needs to have `overflow: visible` for tool tip to not be cut off. Added this as a global style "for now"
                    // domain={{ y: [0, 100] }}
					padding={{ bottom: 100, left: 35, right: 35, top: 40 }}
					theme={VictoryTheme.material}
					containerComponent={
						<VictoryVoronoiContainer
							labels={NutrientGraph.getVictoryTooltipLabel}
							voronoiBlacklist={["missingData"]}
							labelComponent={
								<VictoryTooltip
									style={{
										fontSize: 8,
										padding: 3
									}}
									cornerRadius={5}
									flyoutStyle={{ fill: "white" }}
								/>
							}
						/>
					}
				>
					{this.getVictoryGraphPoints(linesData)}
					{this.getVictoryGraphLines(linesData)}

					<VictoryAxis
						independentAxis
						style={{
							tickLabels: {
								fontSize: 7,
								padding: 1,
								verticalAnchor: "middle",
								textAnchor: "start",
								angle: 45
							}
						}}
						tickFormat={NutrientGraph.processGraphLabel}
					/>
					<VictoryAxis
						dependentAxis
						style={{
							tickLabels: { fontSize: 7, padding: 1 },
							axisLabel: { fontSize: 6, padding: 25 }
						}}
						tickFormat={NutrientGraph.yTickFormat}
						label={yLabel}
					/>
				</VictoryChart>
			</WidthWrapper>
		);
	}
}
