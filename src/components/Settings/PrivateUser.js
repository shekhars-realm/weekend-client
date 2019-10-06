import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
//mui imports
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
//redux imports
import {connect} from 'react-redux';
import {changePrivateStatus} from '../../redux/actions/userActions'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
})

class PrivateUser extends React.Component {
  state = {
    checked: false,
    switching: false
  }
  componentDidMount() {
    this.setState({
      checked: this.props.privateUser
    })
  }
  handleChange = () => {
    this.props.changePrivateStatus(!this.state.checked)
  }
  render() {
    const {classes, privateUser} = this.props
    return (
      <div className={classes.container}>
        <Typography variant='body2' className={classes.text}>Private</Typography >
        <Switch
          checked={privateUser}
          onChange={this.handleChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
    );
  }
}

PrivateUser.propTypes = {
  classes: PropTypes.object.isRequired,
  privateUser: PropTypes.bool.isRequired,
  changePrivateStatus: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  privateUser: state.user.credentials.privateUser,
})

export default connect(mapStateToProps, {changePrivateStatus})(withStyles(styles)(PrivateUser))
