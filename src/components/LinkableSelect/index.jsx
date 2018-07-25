import React, { Component } from 'react';

import VirtualizedSelect from 'react-virtualized-select'
import SelectField from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import PropTypes from 'prop-types';

class LinkableSelect extends Component {
    tagsChanged(value) {
        this.props.onChange(value);

        //update URL to match the new tags
        const newTags = value.map(selectable => selectable.value); //get tag values from select options
        const tagSearchParam = (newTags.length > 0) ? newTags.join(this.props.paramSeparator) : ''; //create the query string

        //create a new URL using the tags new params
        let url = new URL(window.location.href);
        let params = url.searchParams;
        
        //delete the old param and add the new one
        params.delete(this.props.paramName);
        params.append(this.props.paramName, tagSearchParam);

        //update URL
        this.props.history.replace(url.toString().replace(url.origin, ""));
    }

    addAll() {
        this.props.onChange(this.props.options);
    }

    constructor(props) {
        super(props);
        //bind fucntions to this class
        this.addAll = this.addAll.bind(this);
        this.tagsChanged = this.tagsChanged.bind(this);

        console.log(this.props)

        //set initial tags from url params
        const urlTags = (new URLSearchParams(this.props.location.search).get(this.props.paramName) || '').split(this.props.paramSeparator);
        const realUrlTags = urlTags.filter(t => this.props.options.includes(t));
        const selectableURLTags = this.props.tagsToSelectables(realUrlTags);
        this.props.onChange(selectableURLTags);
    }

    render() {
        const { onChange, ...props } = this.props;
        return (
            <VirtualizedSelect
                onChange={this.tagsChanged}
                {...props}
                value={this.props.selectedTags}
                options={this.props.options}
                name="form-field-name"
                joinValues
                multi
            />
        );
    }
}

LinkableSelect.defaultProps = {
    paramSeparator: '_',
    paramName: 'selected'
};

export default withRouter(LinkableSelect);

