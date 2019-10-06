import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//redux connects
import {connect} from 'react-redux';
import {getLoadedUser} from '../../redux/actions/userActions';

class UnfollowUser extends React.Component {
  state={
    open: false,
    loading: false,
    error: ''
  }
  handleUnfollowUser = () => {
    this.setState({
      loading: true
    })
    axios.get('user/unfollow/'+this.props.user).then(res => {
      this.setState({
        loading: false,
        open: false
      })
      this.props.getLoadedUser(this.props.user)
    }).catch(err => {
      console.log(err.response);
      this.setState({
        loading: false,
        open: false
      })
    })
  }
  render () {
    const {user} = this.props;
    const {open, loading, error} = this.state;
    return (
      <div>
        <Typography variant="body1" color="darkred" onClick={() => {this.setState({open: true})}}>
          Unfollow
        </Typography>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unfollow " + user + "?"}</DialogTitle>
          <DialogActions>
            <Button onClick={() => {this.setState({open: false})}} color="secondary">
              Cancel
            </Button>
            <Button disabled={loading} variant='contained' onClick={this.handleUnfollowUser} color="secondary">
              Unfollow
              {
                loading && (
                  <CircularProgress size={30} className='inBtnProgress' style={{position: 'absolute'}}/>
                )
              }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UnfollowUser.propTypes = {
  removeUserFromEvent: PropTypes.func.isRequired
}

export default connect(null, {getLoadedUser})(UnfollowUser);
