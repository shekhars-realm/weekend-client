import React, {Fragment} from 'react';
import '../App.css';
import axios from 'axios';
import PropTypes from 'prop-types';
//import components
import Map from '../components/Map'
import EventSlider from  '../components/Events/EventSlider';
import FilterBar from '../components/Events/FilterBar';
import EventList from '../components/Events/EventList';
import EventListMobileView from '../components/Events/EventListMobileView';
import Navbar from '../components/Layout/Navbar'
import MyButton from '../utils/MyButton'
//Mui imports
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import GpsFixed from '@material-ui/icons/GpsFixed';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MapIcon from '@material-ui/icons/Map';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import $ from 'jquery';
import Welcome from '../components/Layout/Welcome'
//redux imports
import {connect} from 'react-redux';
import {setUserFilter} from '../redux/actions/userActions';
import {setLocations, resetUploadFlags} from '../redux/actions/dataActions';

const styles = theme => ({
  banner: {
    width: $('.container').width(),
    height: '80vh'
  },
  bannerBtn: {
    position: 'absolute',
    top: '46%',
    right: '7%',
    width: 200,
    height: 60,
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 27,
    fontFamily: 'Righteous'
  },
  searchButton: {
    position: 'fixed',
    right: 10,
    zIndex: 2,
    bottom: '12%',
  },
  listViewBtn: {
    position: 'fixed',
    zIndex: 2,
    bottom: '6%',
    right: 10,
  },
  recenterMap: {
    position: 'fixed',
    top: '10%',
    right: 10,
    zIndex: 1
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  }
})

const getLocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 0
}

class Home extends React.Component {

  state={
    open: false,
    listView: true,
    showMap: true,
    askLocationPerm: false,
    openLocation: false,
    newUser: false
  }

  componentDidMount() {
    if(this.props.location.state) {
      this.setState({newUser: true})
    }
    let thisComponent = this;
    if(thisComponent.props.data.locations.length === 0) {
      navigator.permissions.query({name:'geolocation'}).then(function(result) {
       if (result.state == 'granted') {
           navigator.geolocation.getCurrentPosition(
             thisComponent.getlocationSuccess,
             thisComponent.getLocationError,
             getLocationOptions
           )
       } else if (result.state == 'prompt') {
           thisComponent.setState({askLocationPerm: true})
       } else {
         thisComponent.setState({openLocation: true})
       }
      });
    }

  }
  getUserLocation = () => {
    console.log('get user loc');
    this.setState({askLocationPerm: false})
    navigator.geolocation.getCurrentPosition(this.getlocationSuccess, this.getLocationError, getLocationOptions)
  }
  getlocationSuccess = (pos) => {
    delete axios.defaults.headers.common["Authorization"];
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.coords.latitude + "," + pos.coords.longitude + "&sensor=true&key=" + process.env.REACT_APP_API_KEY).then(res => {
      console.log('location success');
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
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
        queryLocation: 'Canaught place, New Delhi, India',
        location: {
          lat: 28.632133,
          lng: 77.218549,
        },
        radius: 20,
        searchText: '',
        startTime: new Date().toISOString()
      }
      this.props.setUserFilter(filter)
      this.props.setLocations(filter)
    })
  }
  handleCloseLocation = () => {
    const filter = {
      queryLocation: 'Canaught place, New Delhi, India',
      location: {
        lat: 28.632133,
        lng: 77.218549,
      },
      radius: 20,
      searchText: '',
      startTime: new Date().toISOString()
    }
    this.props.setUserFilter(filter)
    this.props.setLocations(filter)
    this.setState({showMap: true, openLocation: false})
  }
  getLocationError = (err) => {
    console.log(err);
    this.setState({openLocation: true})
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
    const {data: {locations}, authenticated, classes} = this.props
    if(this.props.eventAdded) {
      this.props.history.push('/')
      this.props.resetUploadFlags()
    }
    if(this.props.momentUploaded) {
      this.props.history.push('/feed')
      this.props.resetUploadFlags()
    }
    return (
      <Fragment>
        <Navbar/>
        {
          authenticated ? null : (
            <Hidden xsDown>
              <div className={classes.banner}>
                <ul class='bannerUL'>
                  <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/homeScreen.png")'}}></li>
                  <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/feedScreen.png")'}}></li>
                  <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/profileScreen.png")'}}></li>
                  <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/scheduleScreen.png")'}}></li>
                </ul>
                <a href="#filterBar"><Button className={classes.bannerBtn} variant='contained'>Let's Go</Button></a>
              </div>
            </Hidden>
          )
        }
        <Grid id="filterBar" container spacing={0}>
          <Grid style={{padding: '5px 0px 0px 0px', textAlign: 'center'}} item sm={12} xs>
            <Hidden only='xs'>
              <FilterBar/>
            </Hidden>
            <Hidden smUp>
              <Fab className={classes.searchButton} size='small' variant='contained' color='secondary' onClick={() => {this.setState({open: true})}}><SearchIcon/></Fab>
              {
                !this.state.listView ? <Button className={classes.recenterMap} variant='contained' color='secondary' onClick={() => this.getUserLocation()}><GpsFixed/></Button> : null
              }
            </Hidden>
          </Grid>
          <Grid style={{padding: 0, textAlign: 'center'}} item sm={12} xs={12}>
            <Hidden xsDown><Map/></Hidden>
            <Hidden smUp>
              {
                this.state.listView ? <EventListMobileView history={this.props.history}/> : <Map/>
              }
            </Hidden>
          </Grid>
          <Grid item sm xs={12}>
            <Hidden xsDown>
              {
                locations.length > 0 ? <EventSlider history={this.props.history}/> : <Typography className='informationText' color='secondary'>{'No events found, try switching location, search radius or time.'}</Typography>
              }
            </Hidden>
          </Grid>
          <Hidden smUp>
            <Fab onClick={() => {this.toggleView()}} size='small' variant='contained' color='secondary' className={classes.listViewBtn}>{
                this.state.listView ? <MapIcon/> : <ListAltIcon/>
            }</Fab>
          </Hidden>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            fullScreen={$(window).width() < 600 ? true : false}
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Search events!"}</DialogTitle>
              <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
                <CloseIcon color='secondary'/>
              </MyButton>
            <DialogContent>
              <FilterBar isMobile={true} handleClose={this.handleClose}/>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.openLocation}
            onClose={this.handleCloseLocation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Location access denied!"}</DialogTitle>
            <DialogContent>
              {'You have blocked Spinzer from accessing your location.'}
              <br/>
              {'Your can still search events by providing a customized location in the filter pannel.'}
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={() => this.handleCloseLocation()}>Alright!</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.askLocationPerm}
            onClose={this.handleCloseLocationPerm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Access location!"}</DialogTitle>
            <DialogContent>
              {'Spinzer needs to know your locaiton to find you the best events nearby.'}
              <br/>
              {'Please allow location access permission.'}
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={() => this.getUserLocation()}>Alright!</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Hidden smUp>
          {
            this.state.newUser ? <Welcome/> : null
          }
        </Hidden>
      </Fragment>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  setUserFilter: PropTypes.func.isRequired,
  setLocations: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  eventAdded: PropTypes.bool.isRequired,
  resetUploadFlags: PropTypes.func.isRequired,
  momentUploaded: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
  eventAdded: state.data.eventAdded,
  momentUploaded: state.moment.momentUploaded,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {setUserFilter, setLocations, resetUploadFlags})(withStyles(styles)(Home));
