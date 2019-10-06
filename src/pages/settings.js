import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Layout/Navbar'
import SettingsMobileView from '../components/Layout/SettingsMobileView'
import $ from 'jquery'
//mui imports
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  settingContainer: {
    padding: '5%',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    backgroundColor: 'white'
  },
  settingRoot: {
    padding: '5%'
  }
})

class setting extends React.Component {
  state={
    selectedIndex: 0
  }
  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index
    })
  }
  render () {
    const {classes} = this.props
    const {selectedIndex} = this.state
    const content = <SettingsMobileView history={this.props.history}/>
    return(
      <Fragment>
        <Navbar/>
        {content}
      </Fragment>
    )
  }
}

setting.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(setting);
