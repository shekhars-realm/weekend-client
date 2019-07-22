import React from 'react';
import '../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
//import components
import Map from '../components/Map'
import EventSlider from  '../components/Events/EventSlider';
import FilterBar from '../components/Events/FilterBar';
//Mui imports
import Grid from '@material-ui/core/Grid';
//redux imports
import {connect} from 'react-redux';

class Home extends React.Component {

  state = {
    shouts: null
  }

  componentDidMount() {

  }
  render() {
    const {locations} = this.props.data
    return (
      <Grid container spacing={6}>
        <Grid item sm={12}>
          <FilterBar/>
        </Grid>
        <Grid item sm={12}>
          <Map/>
        </Grid>
        <Grid item sm xs={12}>
          {
            locations.length > 0 ? <EventSlider/> : null
          }
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps)(Home);
