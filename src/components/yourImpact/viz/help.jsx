import React, { Component } from 'react';

import Typography from 'material-ui/Typography/Typography';

import Help from '../../help';
import FoodEstimator from '../../foodEstimator';
import { titleize, getLink } from '../../../utils/GeneralUtils';

export default class DataVizHelp extends Component {
    render() {
        return (
            <Help
                title="Yearly Impact"
                content={(
                    <div>
                        <h4>Calculations</h4>
                        <Typography>We take your personal diet composition and scale by the number of calories you consume to create these graphs.</Typography>
                        <br />
                        <Typography>Comparative Greenhouse Gas units can be found at the US Energy Information Administration {getLink("https://www.eia.gov/tools/faqs/faq.php?id=307&t=11", "here")} and {getLink("https://www.eia.gov/environment/emissions/co2_vol_mass.php", "here")}</Typography>
                        <br />
                        <Typography>
                            Water units were found at the following locations:
                            {getLink("https://www.usbr.gov/lc/hooverdam/history/essays/jetflow.html", "Hoover Dam")},
                            {getLink("https://www.niagarafallsstatepark.com/niagara-falls-state-park/amazing-niagara-facts", "Niagara Falls")},
                            {getLink("https://en.wikipedia.org/wiki/Olympic-size_swimming_pool", "Olympic Swimming Pool")},
                            {getLink("https://www.home-water-works.org/indoor-use/showers", "Showers")}
                        </Typography>

                        <h4>Estimated Diet Comparisons</h4>

                        <Typography>
                            The comparison diets are best-estimates, there isn't much available data for this.
                            The "American" Diet is loosely adapted from the {getLink("https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/food-availability-per-capita-data-system", "2010 USDA ERS - Food availability per capita.")}
                        </Typography>
                        {
                            this.props.refFoodUsages.map(x => {
                                return (
                                    <div>
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
