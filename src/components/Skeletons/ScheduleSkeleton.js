import React from 'react';
import PropTypes from 'prop-types';
//mui imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    fontWeight: 700,
    height: 30
  },
  eventTime: {
    fontSize: 22,
    fontWeight: 700
  },
  weekDay: {
    fontSize: 25,
    width: 100
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 700
  }
})


class ScheduleSkeleton extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.heading}>
          &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
        </div>
        <Table className={classes.table}>
          <TableBody>
            <TableRow key={0}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Monday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={1}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Tuesday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Wednesday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={3}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Thursday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={4}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Friday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={5}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Saturday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
            <TableRow key={7}>
              <TableCell className={classes.weekDay} component= "th" scope="row">
                Sunday
              </TableCell>
              <TableCell align='left'>
              <div className={classes.eventList}>
                <div className={classes.eventCell}>
                  <div className={classes.eventName}/>
                </div>
              </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ScheduleSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ScheduleSkeleton)
