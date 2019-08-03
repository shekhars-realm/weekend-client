import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ScheduleSkeleton from './ScheduleSkeleton'
//mui imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//redux imports
import {connect} from 'react-redux'

const _ = require('lodash');
const moment = require('moment')

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  eventList: {
    display: 'block'
  },
  eventCell: {
    background: theme.palette.primary.main,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  eventName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 700
  },
  eventTime: {
    fontSize: 22,
    fontWeight: 700
  },
  weekDay: {
    fontSize: 25,
    width: 100
  }
})


class Schedule extends React.Component {
  state= {
    loading: true
  }

  render() {
    const {classes, loading, schedule} = this.props;
    const plan = !loading ? <Paper className={classes.root}>
      <Table className={classes.table}>

        <TableBody>
          {
            schedule.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.weekDay} component= "th" scope="row">
                  {moment(new Date(row.weekDay)).format('dddd')}
                </TableCell>
                <TableCell align='left'>
                <div className={classes.eventList}>
                  {
                    row.events.length !== 0 ? (
                      row.events.map((event) => {
                        return(
                          <div className={classes.eventCell}>
                            <div className={classes.eventName}>
                              {event.name}
                            </div>
                            <div className={classes.eventTime}>
                            {moment(new Date(event.startTime)).format('LT') + ' - ' + moment(new Date(event.endTime)).format('LT')}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <Link to='/'>
                        <Button variant='contained' color='secondary'>
                          {'Search for events'}
                        </Button>
                      </Link>
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
  schedule: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  schedule: state.user.credentials.schedule
})

export default connect(mapStateToProps)(withStyles(styles)(Schedule))
