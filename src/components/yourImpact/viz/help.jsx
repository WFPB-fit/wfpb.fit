import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import Help from '../../help';
import FoodEstimator from '../../foodEstimator';
import { titleize, getLink } from '../../../utils/GeneralUtils';

export default class DataVizHelp extends Component {
    render() {
        return (
            <Help
                title="Estimated Diet Comparisons"
                content={(
                    <div>
                        <Typography>
                            The comparison diets are best-estimates, there isn't much available data for this.
                            The "American" Diet is loosely adapted from the {getLink("https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/food-availability-per-capita-data-system", "2010 USDA ERS - Food availability per capita.")}
                        </Typography>
                        {
                            this.props.refFoodUsages.map(x => {
                                return (
                                    <div
                                        key={x.label}>
                                        <h5>{titleize(x.label)}</h5>
                                        <FoodEstimator
                                            disabled
                                            dietComposition={x.data}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                )}
            />
        );
    }
}
