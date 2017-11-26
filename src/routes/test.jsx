import React, { Component } from 'react';
import {
	VictoryGroup, VictoryChart, VictoryAxis,
	VictoryTheme, VictoryTooltip, VictoryScatter, VictoryLine, VictoryVoronoiContainer
} from 'victory';

export default class Test extends Component {

	render() {
		return ( //https://formidable.com/open-source/victory/gallery/multipoint-tooltip-labels/
      <VictoryChart height={400} width={400}
        domainPadding={{y: 10}}
        containerComponent={
          <VictoryVoronoiContainer
            dimension="x"
            labels={(d) => `y: ${d.y}\n, l: ${d.l}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{fill: "white"}}
              />}
          />}
      >
        <VictoryLine
          data={[
            {x: 1, y: 5, l: "one"},
            {x: 1.5, y: 5, l: "one point five"},
            {x: 2, y: 4, l: "two"},
            {x: 3, y: -2, l: "three"}
          ]}
          style={{
            data: {
              stroke: "tomato",
              strokeWidth: (d, active) => {return active ? 4 : 2;}
            },
            labels: {fill: "tomato"}
          }}
        />

        <VictoryLine
          data={[
            {x: 1, y: -3, l: "red"},
            {x: 2, y: 5, l: "green"},
            {x: 3, y: 3, l: "blue"}
          ]}
          style={{
            data: {
              stroke: "blue",
              strokeWidth: (d, active) => {return active ? 4 : 2;}
            },
            labels: {fill: "blue"}
          }}
        />

        <VictoryLine
          data={[
            {x: 1, y: 5, l: "cat"},
            {x: 2, y: -4, l: "dog"},
            {x: 3, y: -2, l: "bird"}
          ]}
          style={{
            data: {
              stroke: "black",
              strokeWidth: (d, active) => {return active ? 4 : 2;}
            },
            labels: {fill: "black"}
          }}
        />
      </VictoryChart>
    );
		// return ( //source: https://formidable.com/open-source/victory/gallery/voronoi-tooltips-grouped/
		// 	<VictoryChart height={400} width={400}
		// 		containerComponent={<VictoryVoronoiContainer />}
		// 	>
		// 		<VictoryGroup
		// 			color="#c43a31"
		// 			labels={(d) => `y: ${d.y}`}
		// 			labelComponent={
		// 				<VictoryTooltip
		// 					style={{ fontSize: 10 }}
		// 				/>
		// 			}
		// 			data={[
		// 				{ x: 'asd', y: -3, 'h': 123 },
		// 				{ x: 'sfd', y: 5 },
		// 				{ x: 'dfg', y: 3 },
		// 			]}
		// 		>
		// 			<VictoryLine />
		// 			<VictoryScatter
		// 				size={(d, a) => { return a ? 8 : 3; }}
		// 			/>
		// 		</VictoryGroup>
		// 		<VictoryGroup
		// 			labels={(d) => `y: ${d.y}`}
		// 			labelComponent={
		// 				<VictoryTooltip
		// 					style={{ fontSize: 10 }}
		// 				/>
		// 			}
		// 			data={[
		// 				{ x: 'asd', y: 3 },
		// 				{ x: 'sdf', y: 1 },
		// 				{ x: 'dfg', y: 2 }
		// 			]}
		// 		>
		// 			<VictoryLine
    //       style={{
    //         data: {
    //           strokeWidth: (d, active) => {return active ? 4 : 2;}
    //         }
    //       }} />
		// 			<VictoryScatter
		// 				size={(d, a) => { return a ? 8 : 3; }}
		// 			/>
		// 		</VictoryGroup>
		// 	</VictoryChart>
		// );
	}
}
