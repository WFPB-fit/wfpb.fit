import React, { Component } from 'react';
import style from './style.css';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextField from 'material-ui/TextField';

export default class FilterTable extends Component {
	clickCheckbox(event) {
		const cb = event.target;
		const checked = cb.checked;
		const tag = cb.id;
		let tagsCopy = Object.assign({}, this.state.checkedTags);
		const tagIncludedInState = this.state.checkedTags.includes(tag);

		// add tag if needed
		if (tagIncludedInState && !checked) {
			tagsCopy.add(tag);
		}
		else if (!tagIncludedInState && checked) {
			tagsCopy.delete(tag);
		}

		this.setState({ checkedTags: tagsCopy });
	}
	clearAll() {
		this.setState({ selectedTags: [] });
	}
	addAll(props = this.props) {
		this.setState({ selectedTags: props.tags });
	}
	constructor() {
		super();
		//bind 'this'
		this.clickCheckbox = this.clickCheckbox.bind(this);
		this.addAll = this.addAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
			value: [],
			selectedTags:[]
    };
	}
	componentWillReceiveProps(newProps) {
		this.addAll(newProps);
	}

	handleSelectChange(value) {
		console.log(value)
		this.setState(prevState => ({
			selectedTags: value
		}));
	}

	render() {
		let CheckBoxes = this.props.tags.map((tag) => (
			//filter out un-approved studies
			<div key={tag} >
				{/* <div style="white-space:nowrap">
					<Checkbox
						onChange={this.clickCheckbox}
						id={tag}
						checked={this.state.checkedTags.includes(tag)}
					/>
					<label for={tag}>
						{tag}
					</label>
				</div> */}
			</div >
		));

		let Ui = (
			<div
				className={style.btn}
			>
				<FlatButton label="All" onClick={this.addAll} />
				<FlatButton label="None" onClick={this.clearAll} />
			</div>
		);

		let options = [
			{ value: 'one', label: 'One' },
			{ value: 'two', label: 'Two' }
		];

		return (
			<div className={style.home}>
				<Card>
					<CardHeader
						title="Search"
					/>
					<CardText>
						<Select
							name="form-field-name"
							value={this.state.value}
							onChange={this.handleSelectChange}
							options={options}
							joinValues
							multi
						/>
						<div>
							<TextField
								hintText="Min Year"
							/>
							<TextField
								hintText="Max Year"
							/>
						</div>

						{CheckBoxes}
					</CardText>
					<CardActions>
						{Ui}
					</CardActions>
				</Card>
			</div>
		);
	}
}
