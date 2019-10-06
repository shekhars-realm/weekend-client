import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    position: 'fixed',
    width: '100%',
    height: 'auto',
    bottom: 0,
    left: 0,
    display: 'none',
    background: theme.palette.primary.main,
  }
})

class Footer extends React.Component {
  componentDidMount() {
    const thisComp = this
    $(document).ready(function(){
      thisComp.footerAlign();
    });

    $( window ).resize(function() {
      thisComp.footerAlign();
    });
    $('body').resize(function () {
      console.log('body chagned');
    })
  }
  footerAlign = () => {
    $('footer').css('display', 'block');
    $('footer').css('height', 'auto');
    if($('html').height() > $(window).height()) {
      $('footer').css('position', 'relative');
    }
    var footerHeight = $('footer').outerHeight();
    $('body').css('padding-bottom', footerHeight);
    $('footer').css('height', footerHeight);
  }
  render () {
    const {classes} = this.props
    return (
      <footer className={classes.footer}>
        <Grid container spacing={2}>
          <Grid item sm={8}>
            <Typography color='white' variant='h6'>What we do?</Typography>
            <br/>
            <Typography color='default' variant='body1'>We are a platform that serves you in the most boring times of your day!</Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography color='white' variant='body1'></Typography>
            <br/>
            <Typography variant='body1'>We are a platform that serves you in the most boring times of your day!</Typography>
          </Grid>
        </Grid>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer);
