import { connect } from 'react-redux'
import Research from './research.jsx'

const mapStateToProps = state => {
    return {
        studies_metadata: state.studies.studies_metadata,
        studies_text: state.studies.studies_text
    }
}

const ResearchContainer = connect(
  mapStateToProps
)(Research)

export default ResearchContainer