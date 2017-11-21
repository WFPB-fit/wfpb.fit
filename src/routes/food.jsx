import React, { Component } from 'react';
import { LineChart, CartesianGrid, Line, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
import FetchData from '../components/foodAnalysis/fetchData.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ ttt: 'a', asd: 12 }, { ttt: 'b', asd: 32 }, { ttt: 'c', asd: 55 },]
		}
		FetchData.convertNutritionJson();
		console.log(FullNutritionInfo)
		// FetchData.getFullNutritionInfo();
	}
	render() {
		let getVal = (x)=>{return x.asd;}
		let getName = (x)=>{return x.ttt;}
		let getStroke = (x)=>{return "#8884d8";}
		return (
			<LineChart width={730} height={250} data={this.state.data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={getName} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey={getVal} stroke="#8884d8" />
			</LineChart>
		);
	}
}
