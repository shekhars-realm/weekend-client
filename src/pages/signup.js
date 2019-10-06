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
//redux Imports
import {connect} from 'react-redux';
import {signUpUser} from '../redux/actions/userActions';

const styles = theme => ({
  container: {
    textAlign: 'center',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
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
  signupGrid: {
  //  backgroundImage: 'url("/images/login.jpg")'
  },
  spinzerName: {
    fontSize: 50,
    padding: 5,
    color: theme.palette.secondary.main,
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signUpUser(newUserData, this.props.history)
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {classes, UI: {loading}} = this.props
    return (
      <Grid container className={classes.container}>
        <Grid item sm={8}>
          <ul class='bannerUL'>
            <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/homeScreen.png")'}}></li>
            <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/feedScreen.png")'}}></li>
            <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/profileScreen.png")'}}></li>
            <li class='bannerImagesList' style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("/images/scheduleScreen.png")'}}></li>
          </ul>
        </Grid>
        <Grid className={classes.signupGrid}  item sm={4} xs={12}>
          <Typography variant='h6' component={Link} to={'/'} className={classes.spinzerName}>Spinzer</Typography>
          <br/>
          <img className={classes.image} src={AppIcon} alt='app icon'/>
          <Typography variant='h5' className={classes.pageTitle}>
            Signup
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              variant='outlined'
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
              variant='outlined'
              type='password'
              label='Password'
              helperText={this.state.errors.password}
              error={this.state.errors.password ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              variant='outlined'
              type='password'
              label='Confirm Password'
              helperText={this.state.errors.confirmPassword}
              error={this.state.errors.confirmPassword ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <TextField
              id='handle'
              name='handle'
              type='text'
              variant='outlined'
              label='Handle'
              helperText={this.state.errors.handle}
              error={this.state.errors.handle ? true : false}
              fullWidth
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
            />
            {
              this.state.errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {this.state.errors.general}
                </Typography>
              )
            }
            <Button disabled={loading} type='submit' variant='contained' color='primary' className={classes.button}>
              Signup
              {
                loading && (
                  <CircularProgress size={30} className={classes.progress}/>
                )
              }
            </Button>
            <br/>
            <small>Already have an account? Log in <Link to='/login'>here</Link></small>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, {signUpUser})(withStyles(styles)(Signup));
