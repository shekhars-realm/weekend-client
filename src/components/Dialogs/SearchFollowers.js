import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import $ from 'jquery'
import MyButton from '../../utils/MyButton';
import {Link} from 'react-router-dom'
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//redux connects
import {connect} from 'react-redux';
import {removeUserFromEvent} from '../../redux/actions/dataActions';

const styles = theme => ({
  counts: {
    textAlign: 'center',
    marginTop: '15%',
    '& span': {
      fontSize: 13
    }
  },
  listUser: {
    width: '100%',
    padding: 5,
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
})

class SearchFollowers extends React.Component {
  state={
    open: false,
    loading: false,
    error: '',
    searchResult: []
  }
  searchUser = (event) => {
    console.log(event.target.value);
    let searchResult = this.props.userList.filter(user => {
      return user.includes(event.target.value)
    })
    console.log(searchResult);
    this.setState({
      searchResult
    })
  }
  handleClose = () => {
    this.setState({open: false})
  }
  render () {
    const {classes, userList, text} = this.props
    const {open, loading, error} = this.state;
    return (
      <div>
        <Typography variant='body1' onClick={() => {this.setState({open: true})}} className={classes.counts}>{userList.length} <br/><span>{text}</span></Typography>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          fullScreen={$(window).width() < 600 ? true: false}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{'Search '+text}</DialogTitle>
          <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color='secondary'/>
          </MyButton>
          <DialogContent>


            <TextField
              id="search-name"
              label="Search user"
              type="search"
              className={classes.userSearch}
              onChange={(event) => this.searchUser(event)}
              margin="normal"
              fullWidth
              variant="outlined"
            />
            {
              this.state.searchResult.length > 0 ? this.state.searchResult.map(user => {
                return <div className={classes.listUser}>
                  <Typography variant='body1' component={Link} to={'/profile/'+user} color='secondary'>{user}</Typography>
                </div>
              }) : (
                userList.length > 0 ? userList.map(user => {
                  return <div className={classes.listUser}>
                    <Typography variant='body1' component={Link} to={'/profile/'+user} color='secondary'>{user}</Typography>
                  </div>
                }) : <div className={classes.listUser}>
                  <Typography variant='body1' color='secondary'>No user found!</Typography>
                </div>
              )
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

SearchFollowers.propTypes = {
  removeUserFromEvent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(null, {removeUserFromEvent})(withStyles(styles)(SearchFollowers));
