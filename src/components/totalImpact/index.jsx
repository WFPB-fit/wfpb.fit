import React, { Component } from 'react';

import styled from 'styled-components';

import FormHelperText from 'material-ui/Form/FormHelperText';
import Typography from 'material-ui/Typography/Typography';

import SlaughterViz from './slaughterViz.jsx';
import Help from '../help';
import { getLink } from '../../utils/GeneralUtils.jsx';


const Wrapper = styled.div`
img{
    display:block;
    margin:0 auto;
}
`;

export default class TotalImpact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wrapper>
                <h2>Environment</h2>
                <h3>Types of Food
                <Help
                        title=""
                        content={(
                            <div>
                                <Typography>Ranganathan, J. et al. 2016. “Shifting Diets for a Sustainable Food Future.” Working Paper, Installment 11 of Creating a Sustainable Food Future. Washington, DC: World Resources Institute. Accessible at http://www.worldresourcesreport.org.                            </Typography>
                                <br />
                                <Typography>{getLink("http://www.wri.org/sites/default/files/Shifting_Diets_for_a_Sustainable_Food_Future_1.pdf", "Read the PDF online")}</Typography>
                            </div>
                        )}
                    />

                </h3>
                <img src="/imgs/data/wri_food_impact.png" alt="Impact of each type of food" />

                <h2>Animals</h2>


                <SlaughterViz />
                {/* {
                    Slaughter.map(x => (
                        <SlaughterViz
                            data={x.data}
                            name={x.name}
                            key={x.name}
                        />
                    ))
                } */}
            </Wrapper>
        );
    }
}
