import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ScheduleSkeleton from '../Skeletons/ScheduleSkeleton'
//mui imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//redux imports
import {connect} from 'react-redux'

const _ = require('lodash');
const moment = require('moment')

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    background: 'none',
    boxShadow: 'none'
  },
  table: {
    minWidth: '100%',
  },
  eventList: {
    display: 'block'
  },
  eventCell: {
    background: theme.palette.secondary.main,
    borderRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
    width: '100%'
  },
  eventName: {
    color: 'white',
    fontSize: 15,
    fontWeight: 700
  },
  eventTime: {
    fontSize: 14,
    fontWeight: 700,
    color: 'black'
  },
  weekDay: {
    fontSize: 15,
    width: 120,
    fontWeight: 700,
    padding: 0
  },
  heading: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 700
  },
  expansionSummary: {
    background: theme.palette.secondary.main,
    height: '40px !important',
    minHeight: 0,
    color: 'white',
    borderRadius: 5
  }
})


class Schedule extends React.Component {
  state= {
    loading: true
  }

  render() {
    const {classes, loading, sameUserLoaded, loadedUser: {handle,schedule}} = this.props;
    const plan = !loading ? <Paper className={classes.root}>
      <div className={classes.heading}>
        {
          sameUserLoaded ? "This week" : handle+"'s schedule"
        }
      </div>
      <Table className={classes.table}>
        <TableBody>
          {
            schedule && schedule.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.weekDay} component= "th" scope="row">
                  {moment(new Date(row.weekDay)).format('dddd, MMMM Do')}
                </TableCell>
                <TableCell align='left'>
                <div className={classes.eventList}>
                  {
                    row.events.length !== 0 ? (
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          className={classes.expansionSummary}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant='body2'>{row.events.length} events</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{padding: 3, display: 'block'}}>
                          {
                            row.events.map(event => {
                              return (
                                  <div className={classes.eventCell}>
                                    <Link to={'/event/'+event.eventId}>
                                      <div className={classes.eventName}>
                                        {event.name}
                                      </div>
                                    </Link>
                                    <div className={classes.eventTime}>
                                    {moment(new Date(event.startTime)).format('LT') + ' - ' + moment(new Date(event.endTime)).format('LT')}
                                    </div>
                                  </div>
                              )
                            })
                          }
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ) : (
                      sameUserLoaded ? <Link to='/'>
                        <Button fullWidth color='secondary'>
                          {'Search for events'}
                        </Button>
                      </Link> : <Button fullWidth disabled={true} variant='contained' color='secondary'>
                        {'Quite busy!'}
                      </Button>
                    )
                  }
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper> : <ScheduleSkeleton/>

    return plan;
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  sameUserLoaded: PropTypes.bool.isRequired,
  schedule: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  loadedUser: state.user.loadedUser,
  sameUserLoaded: state.user.sameUserLoaded
})

export default connect(mapStateToProps)(withStyles(styles)(Schedule))
