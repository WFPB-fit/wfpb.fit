import React, { Component } from 'react';
import style from './style.css';
import Card from 'preact-material-components/Card';

import Checkbox from 'preact-material-components/Checkbox';
import Formfield from 'preact-material-components/Formfield';
import 'preact-material-components/Checkbox/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Textfield from 'preact-material-components/Textfield';
import 'preact-material-components/Textfield/style.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
		this.setState({ checkedTags: [] });
	}
	addAll() {
		this.setState({ checkedTags: this.props.tags });
	}
	constructor(props) {
		super(props);
		//bind 'this'
		this.clickCheckbox = this.clickCheckbox.bind(this);
		this.addAll = this.addAll.bind(this);
		this.clearAll = this.clearAll.bind(this);

		//set initial state values
		this.state.checkedTags = props.tags;
	}
	render() {
		let CheckBoxes = this.props.tags.map((tag) => (
			//filter out un-approved studies
			<LayoutGrid.Cell cols="3" key={tag} align="middle" >
				<div style="white-space:nowrap">
					<Checkbox
						onChange={this.clickCheckbox}
						id={tag}
						checked={this.state.checkedTags.includes(tag)}
					/>
					<label for={tag}>
						{tag}
					</label>
				</div>
			</LayoutGrid.Cell >
		));
		CheckBoxes = (<LayoutGrid>
			<LayoutGrid.Inner>
				{CheckBoxes}
			</LayoutGrid.Inner>
		</LayoutGrid>);

		let Ui = (
			<div
				class={style.btn}
			>
				<Button ripple raised
					onClick={this.addAll}
				>
					All
				</Button>
				<Button ripple raised
					onClick={this.clearAll}
				>
					None
				</Button>
			</div>
		);

		let options = [
			{ value: 'one', label: 'One' },
			{ value: 'two', label: 'Two' }
		];

		function logChange(val) {
			console.log('Selected: ', val);
		}


		return (
			<div class={style.home}>
				<Card>
					<Card.Primary>
						<Select
							name="form-field-name"
							value="one"
							options={options}
							onChange={logChange}
							multi
						/>
						<Formfield>
							<div>
								<Textfield multiline={false} label="Min Year" />
								<Textfield multiline={false} label="Max Year" />
							</div>

							{CheckBoxes}
						</Formfield>
					</Card.Primary>
					<Card.SupportingText>
						{Ui}
					</Card.SupportingText>
				</Card>
			</div>
		);
	}
}
