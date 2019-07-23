import React ,{Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import 'date-fns';
import Script from 'react-load-script';
import LocationSearch from '../../utils/LocationSearch'
import config from '../../utils/config'
import axios from 'axios'
//mui imports
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
//reduc improts
import {connect} from 'react-redux';
import {setLocations} from '../../redux/actions/dataActions';

const {MAP_API_KEY} = config

const styles = theme => ({
  sliderContainer: {
    width: 300,
  },
  textField: {

  },
  dateContainer: {
    display: 'flex'
  },
  filterButton: {
    background: 'transparent',
    margin: 24
  }
})

class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      searchText: '',
      location: null,
      radius: 20,
      startTime: new Date().toISOString(),
      errors: {},
      queryLocation: 'Tukl Kaiserslautern'
    }
  }
  componentDidMount() {
    const filterEvent = {
      radius: this.state.radius,
      queryLocation: this.state.queryLocation,
      searchText: this.state.searchText,
      startTime: this.state.startTime
    }
    this.props.setLocations(filterEvent);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        searchText: '',
        location: null,
        radius: 20,
        startTime: new Date().toISOString(),
        errors: {},
        queryLocation: ''
      })
    }
  }
  handleRadiusChange = (event, newRadius) => {
    this.setState({
      radius: newRadius
    })
  }
  valuetext = (radius) => {
    return `${radius} Km`;
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const filterEvent = {
      radius: this.state.radius,
      queryLocation: this.state.queryLocation,
      searchText: this.state.searchText,
      startTime: this.state.startTime
    }
    this.props.setLocations(filterEvent);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleStartTime = (startTime) => {
    this.setState({startTime})
  }
  render () {
    const {classes} = this.props
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={3} xs={12}>
            <TextField
              id="eventSearch"
              label="Search events"
              placeholder= 'Find by name, tags'
              type="search"
              fullWidth
              name="searchText"
              value={this.state.searchText}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid style={{display: 'flex'}} item sm={3} xs={12}>
            <MuiPickersUtilsProvider className={classes.dateContainer} utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label="Date"
                variant='outlined'
                value={this.state.startTime}
                onChange={this.handleStartTime}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="startTime"
                name="startTime"
                label="Start time"
                variant='outlined'
                value={this.state.startTime}
                onChange={this.handleStartTime}
                error={this.state.errors.startTime ? true : false}
                helperText={this.state.errors.startTime}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={3} xs={12}>
            <TextField
                type="searchLocation"
                fullWidth
                name="queryLocation"
                margin="normal"
                variant="outlined"
                error={this.state.errors.location ? true : false}
                helperText={this.state.errors.location}
                value={this.state.queryLocation}
                placeholder="Search a location"
                onChange={this.handleChange}
            />
          </Grid>
          <Grid style={{display: 'flex'}} item sm={3} xs={12}>
            <div className={classes.sliderContainer}>
              <Typography id="range-slider" gutterBottom>
                {'Search radius (Km)'}
              </Typography>
              <Slider
                value={this.state.radius}
                onChange={this.handleRadiusChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={this.valuetext}
              />
            </div>
            <Button type='submit' variant='contained' className={classes.filterButton}>
              Filter
            </Button>
          </Grid>
        </Grid>
        </form>
      </Fragment>
    )
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  setLocations: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  locations: state.data.locations,
  UI: state.UI
})

export default connect(mapStateToProps, {setLocations})(withStyles(styles)(FilterBar));
