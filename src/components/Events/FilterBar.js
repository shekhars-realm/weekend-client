import React ,{Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import 'date-fns';
import Script from 'react-load-script';
import axios from 'axios'
import _ from 'lodash';
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
import {filterEvents} from '../../redux/actions/dataActions';

const styles = theme => ({
  sliderContainer: {
    width: 300,
    marginTop: 20
  },
  textField: {
    'svg': {
      color: 'red !important'
    }
  },
  dateContainer: {
    display: 'flex',
    color: 'black'
  },
  filterButton: {
    margin: 24
  },
  filterButtonFullWidth: {
    position: 'absolute',
    bottom: 0,
    width: '94%',
    margin: '0px 0px 10px -3%'
  },
  cssLabel: {
    color : 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.secondary.main} !important`,
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.secondary.main} !important`,
    }
  },

  cssFocused: {
    color: 'white',
    borderWidth: '1px',
    borderColor: 'white !important'
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
})

class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      searchText: this.props.filter.searchText ? this.props.filter.searchText : '',
      location: null,
      radius: this.props.filter.radius,
      startTime: this.props.filter.startTime,
      errors: {},
      queryLocation: this.props.filter.queryLocation
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    console.log('next filter props: ',nextProps.filter);
    if(nextProps.filter.searchText !== this.props.filter.searchText) {
      this.setState({
        searchText: nextProps.filter.searchText
      })
    }
    if(nextProps.filter.radius !== this.props.filter.radius) {
      this.setState({
        radius: nextProps.filter.radius
      })
    }
    if(nextProps.filter.queryLocation !== this.props.filter.queryLocation) {
      this.setState({
        queryLocation: nextProps.filter.queryLocation
      })
    }
    if(nextProps.filter.startTime !== this.props.filter.startTime) {
      this.setState({
        startTime: nextProps.filter.startTime
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
      searchText: this.state.searchText.toLowerCase(),
      startTime: this.state.startTime
    }
    this.props.filterEvents(filterEvent);
    if(this.props.handleClose) {
      this.props.handleClose();
    }
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
    console.log(this.props);
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item sm={3} xs={12}>
            <TextField
              id="eventSearch"
              label="Search keyword"
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
                style={{color: 'black'}}
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
                type="search"
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
                style={{color: 'darkgrey'}}
                aria-labelledby="range-slider"
                getAriaValueText={this.valuetext}
                max={20}
              />
            </div>
            {this.props.isMobile ?
              <Button type='submit' variant='contained' color='secondary' className={classes.filterButtonFullWidth}>
                Filter
              </Button> :
              <Button type='submit' variant='contained' color='secondary' className={classes.filterButton}>
                Filter
              </Button>
            }
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
  filterEvents: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  locations: state.data.locations,
  filter: state.user.filter,
  UI: state.UI
})

export default connect(mapStateToProps, {filterEvents})(withStyles(styles)(FilterBar));
