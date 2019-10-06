import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Lock from '@material-ui/icons/Lock';
import SwipeableViews from 'react-swipeable-views';
import EventList from '../Events/EventList'
import Schedule from '../Profile/Schedule';
import ListMobileView from '../Moments/ListMobileView'
import {connect} from 'react-redux'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  lockIcon: {
    color: 'dodgerblue',
    fontSize: 80
  },
  privateProfile: {
    textAlign: 'center',
    padding: '20%'
  }
}));

function SwitchTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const showProfile = props.sameUserLoaded ? true : props.loadedUserFollowers.includes(props.handle) ? true : props.privateUser ? false : true

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        centered
      >
        <Tab label="Moments" {...a11yProps(0)} />
        {
          props.sameUserLoaded ? <Tab label="Schedule" {...a11yProps(1)} /> : null
        }
      </Tabs>
      {
        showProfile ?

        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <ListMobileView sameUserLoaded={props.sameUserLoaded} user={props.user}/>
          </TabPanel>
          {
            props.sameUserLoaded ? <TabPanel value={value} index={1}>
              <Schedule/>
            </TabPanel> : null
          }
      </SwipeableViews> : props.fetchingMoments ? null : <div className={classes.privateProfile}>
        <Lock className={classes.lockIcon}/>
        <Typography variant='h5'>Private</Typography>
      </div>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  privateUser: state.user.loadedUser.privateUser,
  sameUserLoaded: state.user.sameUserLoaded,
  loadedUserFollowers: state.user.loadedUserFollowers,
  handle: state.user.credentials.handle,
  fetchingMoments: state.moment.fetchingMoments,
  sameUserLoaded: state.user.sameUserLoaded
})

SwitchTabs.propTypes = {
  privateUser: PropTypes.bool.isRequired,
  sameUserLoaded: PropTypes.bool.isRequired,
  loadedUserFollowers: PropTypes.array.isRequired,
  handle: PropTypes.string.isRequired,
  fetchingMoments: PropTypes.bool.isRequired,
  sameUserLoaded: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(SwitchTabs)
