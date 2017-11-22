import React, { Component } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
import FetchData from '../components/foodAnalysis/fetchData.js';
import exampleFDAdata from '../assets/data/nutrition/exampleFDA.json';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ ttt: 'a', asd: 12 }, { ttt: 'b', asd: 32 }, { ttt: 'c', asd: 55 },]
		}
		console.log(FullNutritionInfo)
		console.log(exampleFDAdata)
		// FetchData.getFullNutritionInfo();
	}
	render() {
		const nNum = 20;
		return (
			<RadarChart outerRadius={90} width={730} height={250} data={FullNutritionInfo[nNum].nutrients.sums}>
				<PolarGrid />
				<PolarAngleAxis dataKey="name" />
				<PolarRadiusAxis angle={30} domain={[0, 150]} />
				<Radar name={FullNutritionInfo[nNum].name} dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
				<Legend />
			</RadarChart>
		);
	}
}
