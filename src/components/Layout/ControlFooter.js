import React from 'react'
import PropTypes from 'prop-types'
import AddSpeedDial from '../Dialogs/AddSpeedDial'
import {Link} from 'react-router-dom'
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import ImageIcon from '@material-ui/icons/CropOriginal';
import PersonPinIcon from '@material-ui/icons/PersonOutline';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
//redux imports
import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    position: 'fixed',
    display: 'flex',
    height: '5%',
    bottom: 0,
    zIndex: 2,
    width: '100%',
    background: theme.palette.primary.main,
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  controllerBtn: {
    boxShadow: 'unset'
  }
})

class ControlFooter extends React.Component {
  render () {
    const {classes, handle} = this.props
    return(
      <div className={classes.container}>
        <Button variant='contained' color='primary' component={Link} to={'/'} className={classes.controllerBtn}>
          <PublicIcon/>
        </Button>
        <Button variant='contained' color='primary' component={Link} to={'/feed'} className={classes.controllerBtn}>
          <ImageIcon/>
        </Button>
        <AddSpeedDial/>
        <Button variant='contained' component={Link} to={'/notifications'} color='primary' className={classes.controllerBtn}><NotificationsNone/></Button>
        <Button variant='contained' color='primary' component={Link} to={`/profile/${handle}`} className={classes.controllerBtn}><PersonPinIcon/></Button>
      </div>
    )
  }
}

ControlFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps)(withStyles(styles)(ControlFooter));
