import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class Resource extends Component {
	render() {
		let title = null;
		if (this.props.title) {
			title = (
				<Toolbar>
					<Typography variant="h5" id="tableTitle">
						{this.props.title}
					</Typography>
				</Toolbar>
			);
		}

		return (
			<Paper style={this.props.style}>
				{title}
				<Table style={this.props.tableStyle} aria-labelledby="tableTitle">
					<TableHead>
						<TableRow>
							<TableCell>{this.props.keyLabel}</TableCell>
							<TableCell>{this.props.valueLabel}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(this.props.data).map(key => {
                            const val = this.props.data[key]
							return (
								<TableRow>
									<TableCell>{key}</TableCell>
									<TableCell numeric={typeof val === 'number'}>{val}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}
