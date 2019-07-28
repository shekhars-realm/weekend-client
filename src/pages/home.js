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
import {setUserLocation} from '../redux/actions/userActions';

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
    this.props.setUserLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    })
  }
  getLocationError = (err) => {
    this.props.setUserLocation({
      lat: 49.4252252,
      lng: 7.7481535,
    })
  }
  render() {
    const {locations} = this.props.data
    console.log('in hone page',locations);
    return (
      <Grid container spacing={6}>
        <Grid item sm={1}/>
        <Grid item sm={10} xs>
          <FilterBar/>
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm={1}/>
        <Grid item sm={10}>
          <Map/>
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm xs={12} xs>
          {
            locations.length > 0 ? <EventSlider/> : <Typography className='informationText' variant='h5' color='primary'>{'No events found, try switching location, search radius or time.'}</Typography>
          }
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  setUserLocation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {setUserLocation})(Home);
