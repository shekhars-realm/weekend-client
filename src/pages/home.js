import React from 'react';
import '../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
//import components
import Map from '../components/Map'
import EventSlider from  '../components/Events/EventSlider';
import FilterBar from '../components/Events/FilterBar';
import EventList from '../components/Events/EventList';
//Mui imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
//redux imports
import {connect} from 'react-redux';
import {setUserFilter} from '../redux/actions/userActions';
import {setLocations} from '../redux/actions/dataActions';

const getLocationOptions = {
  enableHighAccuracy: true,
  timeout: 50,
  maximumAge: 0
}

class Home extends React.Component {

  state={
    open: false,
    listView: false
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getlocationSuccess, this.getLocationError, getLocationOptions)
  }
  getlocationSuccess = (pos) => {
    delete axios.defaults.headers.common["Authorization"];
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "&sensor=true&key=" + process.env.REACT_APP_API_KEY).then(res => {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
      console.log('result places: ', res);
      if(res.data.results.length > 0) {
        const filter = {
          queryLocation: res.data.results[0].formatted_address,
          location: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          radius: 20,
          searchText: '',
          startTime: new Date().toISOString()
        }
        this.props.setUserFilter(filter)
        this.props.setLocations(filter)
      }
    }).catch(err => {
      const filter = {
        queryLocation: 'delhi',
        location: {
          lat: 28.881338,
          lng: 77.34845780000001,
        },
        radius: 20,
        searchText: '',
        startTime: new Date().toISOString()
      }
      this.props.setUserFilter(filter)
      this.props.setLocations(filter)
    })
  }
  getLocationError = (err) => {
    console.log('location access rejected');
  }
  handleClose = () => {
    this.setState({open: false})
  }
  toggleView = () => {
    this.setState({
      listView: !this.state.listView
    })
  }
  render() {
    const {locations} = this.props.data
    return (
      <Grid container spacing={0}>
        <Grid item sm={1}/>
        <Grid style={{padding: '5px 0px 0px 0px'}} item sm={10} xs>
          <Hidden smDown>
            <FilterBar/>
          </Hidden>
          <Hidden smUp>
            <Button style={{width: '84%', margin: '0px 40px 10px 40px'}} variant='contained' color='default' onClick={() => {this.setState({open: true})}}>Get engaged!</Button>

          </Hidden>
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm={1}/>
        <Grid style={{padding: 0}} item sm={10} xs={12}>
        {
          this.state.listView ? <EventList events={locations} history={this.props.history}/> : <Map/>
        }
        </Grid>
        <Grid item sm={1}/>
        <Grid item sm xs={12}>
          <Hidden mdDown>
            {
              locations.length > 0 ? <EventSlider history={this.props.history}/> : <Typography className='informationText' variant='h5' color='primary'>{'No events found, try switching location, search radius or time.'}</Typography>
            }
          </Hidden>

        </Grid>
        <Grid style={{position: 'fixed', width: '100%', bottom: 0}} item sm xs>
          <Hidden smUp>
            <Button onClick={() => {this.toggleView()}} style={{width: '76%', margin: '0px 40px 10px 40px', backgroundColor: !this.state.listView ? 'red' : 'green'}} variant='contained'>{
                this.state.listView ? 'Map view' : 'List view'
              }</Button>
          </Hidden>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Search events!"}</DialogTitle>
          <DialogContent>
            <FilterBar handleClose={this.handleClose}/>
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  setUserFilter: PropTypes.func.isRequired,
  setLocations: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {setUserFilter, setLocations})(Home);
