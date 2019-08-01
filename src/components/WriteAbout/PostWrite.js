import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
//Muiimports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons import
import CloseIcon from '@material-ui/icons/Close';
//redux Imports
import {connect} from 'react-redux';

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
  }
});

class PostWrite extends Component {
  state={
    open: false,
    body: '',
    errors: {}
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: '',
        open: false,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.props.clearErrors();
    this.setState({open: false, errors: {}})
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
  //  this.props.postShout({body: this.state.body});
  }
  render () {
    const {classes, UI: {loading}, handle} = this.props;
    return (
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                multiline
                rows='3'
                placeholder={'Write about ' + handle}
                error={this.state.errors.body ? true : false}
                helperText={this.state.errors.body}
                className={classes.textField}
                fullWidth
                onChange={this.handleChange}
              />
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
              </Button>
            </form>
    )
  }
}

PostWrite.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps)(withStyles(styles)(PostWrite));
