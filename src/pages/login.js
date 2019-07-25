import React from 'react';
import '../App.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
//Mui Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux imports
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = theme => ({
  form: {
    textAlign: 'center'
  },
  image: {
    maxWidth: 100,
    margin: '10px auto 10px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8em',
    margin: '5px auto 5px auto'
  },
  progress: {
    position: 'absolute'
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    console.log(this.props)
    const {classes, UI: {loading}} = this.props
    return (
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm/>
        <Grid item sm xs>
          <img className={classes.image} src={AppIcon} alt='app icon'/>
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              helperText={this.state.errors.email}
              error={this.state.errors.email ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              helperText={this.state.errors.password}
              error={this.state.errors.password ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {
              this.state.errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {this.state.errors.general}
                </Typography>
              )
            }
            <Button disabled={loading} type='submit' variant='contained' color='secondary' className={classes.button}>
              Login
              {
                loading && (
                  <CircularProgress size={30} className={classes.progress}/>
                )
              }
            </Button>
            <br/>
            <small>don't have an account? Sign up <Link to='/signup'>here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
        <Grid item sm/>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
