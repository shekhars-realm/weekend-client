import React from 'react';
import '../App.css';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import backgroundImage from '../images/loginPage.jpg';
import axios from 'axios'
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
  container: {
    textAlign: 'center',
  //  backgroundImage: '/images/loginPage.jpg'
  },
  form: {
    textAlign: 'center',
    padding: 50
  },
  image: {
    maxWidth: 60,
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
    position: 'absolute',
    color: theme.palette.primary.main
  },
  loginGrid: {
    backgroundImage: 'url("/images/login.jpg")',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  },
  spinzerName: {
    fontFamily: 'Righteous',
    fontSize: 50,
    padding: 5,
    color: theme.palette.primary.main,
  }
});

class ResetPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailSent: false,
      loading: false,
      errors: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log('submnitted');
    this.setState({loading: true})
    event.preventDefault()
    axios.post('/forgotPassword', {email: this.state.email}).then(res => {
      this.setState({loading: false, emailSent: true})
    }).catch(err => {
      this.setState({loading: false,error: err.response.data.error})
    })
  }
  render() {
    console.log(this.props)
    const {classes} = this.props
    return (
      <Grid container className={classes.container} style={{
          backgroundImage: AppIcon
        }}>
        <Grid item sm/>
        <Grid className={classes.loginGrid} item sm={4} xl={3} lg={3} md={4} xs={12}>
          <Typography variant='h6' component={Link} to={'/'} className={classes.spinzerName}>Spinzer</Typography>
          <br/>
          <img className={classes.image} src={AppIcon} alt='app icon'/>
          <Typography variant='h5' className={classes.pageTitle}>
            Forgot password?
          </Typography>
          {
            this.state.emailSent ? null : <Typography style={{margin: '0px 15px 0px 15px'}} variant='body1' className={classes.pageTitle}>
              Please type in your email associated with Spinzer and we will send a link to reset your password.
            </Typography>
          }
          {
            this.state.emailSent ? (
              <div>
                <Typography style={{margin: '0px 15px 0px 15px'}} variant='body1' className={classes.pageTitle}>
                  A link has been sent to {this.state.email}. Please resetyour password and Login.
                </Typography>
                <Button component={Link} to={'/login'} variant='contained' color='secondary' className={classes.button}>
                  Login
                </Button>
              </div>
            ) : (
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id='email'
                  variant='outlined'
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
                {
                  this.state.errors.general && (
                    <Typography variant='body2' className={classes.customError}>
                      {this.state.errors.general}
                    </Typography>
                  )
                }
                <Button disabled={this.state.loading} type='submit' variant='contained' color='secondary' className={classes.button}>
                  Send
                  {
                    this.state.loading && (
                      <CircularProgress size={30} className={classes.progress}/>
                    )
                  }
                </Button>
                <br/>
                {
                  this.state.error !== '' ? <Typography variant='caption' color='primary' className={classes.customError}>
                    {this.state.error}
                  </Typography> : null
                }
                <br/>
                <small>Already have an account?<Link to='/login'>Login!</Link></small>
                <br/>
                <small>{"don't have an account? Sign up "}<Link to='/signup'>here</Link></small>
              </form>
            )
          }
        </Grid>
        <Grid item sm/>
      </Grid>
    );
  }
}

ResetPwd.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ResetPwd));
