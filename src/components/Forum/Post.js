import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
//Muiimports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
//icons import
import CloseIcon from '@material-ui/icons/Close';
//redux Imports
import {connect} from 'react-redux';
import {addForum, deleteAlert} from '../../redux/actions/forumActions';

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  submitButton: {
    position: 'relative',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
  form: {
    marginBottom: 50
  }
});

class Post extends Component {
  state={
    open: false,
    body: '',
    errors: {}
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.body === '') {
      let errors = {
        body: 'Cannot be empty!'
      }
      this.setState({errors})
    } else {
      this.props.addForum(this.state.body);
      this.setState({body: ''})
    }
  //  this.props.postShout({body: this.state.body});
  }
  render () {
    const {classes, alert} = this.props;
    return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                multiline
                rows='3'
                variant='outlined'
                placeholder={'Ask about the event'}
                error={this.state.errors.body ? true : false}
                helperText={this.state.errors.body}
                className={classes.textField}
                fullWidth
                onChange={this.handleChange}
              />
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton}>
                Submit
              </Button>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alert !== ''}
                autoHideDuration={2000}
                onClose={this.props.deleteAlert}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{alert}</span>}
              />
            </form>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  addForum: PropTypes.func.isRequired,
  deleteAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  alert: state.forum.alert
})

export default connect(mapStateToProps, {addForum, deleteAlert})(withStyles(styles)(Post));
