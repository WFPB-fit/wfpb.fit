import React, { Component } from "react";

import styled from "styled-components";

import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getLink } from "../../utils/GeneralUtils";
import SlaughterData from "../../assets/data/animals/slaughter.js";
import Help from "../help";

const Wrapper = styled.div`
	text-align: center;
	max-width: 400px;
	margin: 0 auto;
`;

export default class SlaughterViz extends Component {
	render() {
		let data = SlaughterData.sort((x, y) => {
			return x.data["2016"] - y.data["2016"];
		});
		data = data.map(x => {
			return { x: x.name, y: (x.data["2016"] * 1000).toLocaleString() }; //data in units of 1,000 head
		}, {});

		return (
			<Wrapper>
				<h3>
					{" "}
					Slaughter Information
					<Help
						title="Slaughter Information"
						content={
							<div>
								<Typography>
									{"These numbers are from the "}
									{getLink(
										"http://usda.mannlib.cornell.edu/MannUsda/viewDocumentInfo.do?documentID=1497",
										"USDA: Poultry Slaughter Annual Summary"
									)}
									{" and the "}
									{getLink(
										"http://usda.mannlib.cornell.edu/MannUsda/viewDocumentInfo.do?documentID=1097",
										"USDA: Livestock Slaughter Annual Summary"
									)}
									{`. 
                    This data only includes American slaughter houses that have been federally inspected. 
                    The total worldwide number is much 
                    `}
									{getLink(
										"https://apps.fas.usda.gov/psdonline/circulars/livestock_poultry.pdf",
										"higher."
									)}
								</Typography>
							</div>
						}
					/>
				</h3>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Animal</TableCell>
							<TableCell>Number Killed in USA (2016) </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(n => {
							return (
								<TableRow key={n.x}>
									<TableCell>{n.x}</TableCell>
									<TableCell numeric>{n.y}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Wrapper>
		);
	}
}
