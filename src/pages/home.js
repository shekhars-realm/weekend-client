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
import Typography from '@material-ui/core/Typography';
//redux imports
import {connect} from 'react-redux';
import {setUserFilter} from '../redux/actions/userActions';

const getLocationOptions = {
  enableHighAccuracy: true,
  timeout: 50,
  maximumAge: 0
}

class Home extends React.Component {


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getlocationSuccess, this.getLocationError, getLocationOptions)
  }
  getlocationSuccess = (pos) => {
    this.props.setUserFilter({
      location: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      },
      radius: 20,
      searchText: '',
      startTime: new Date().toISOString()
    })
  }
  getLocationError = (err) => {
    this.props.setUserLocation({
      location: {
        lat: 49.4252252,
        lng: 7.7481535,
      },
      radius: 20,
      searchText: '',
      startTime: new Date().toISOString()
    })
  }
  render() {
    const {locations} = this.props.data
    return (
      <Grid container spacing={6}>
        <Grid item sm={1}/>
        <Grid item sm={10} xs>
          <FilterBar/>
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm={1}/>
        <Grid item sm={10} xs={12}>
          <Map/>
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm xs={12}>
          {
            locations.length > 0 ? <EventSlider history={this.props.history}/> : <Typography className='informationText' variant='h5' color='primary'>{'No events found, try switching location, search radius or time.'}</Typography>
          }
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  setUserFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {setUserFilter})(Home);
