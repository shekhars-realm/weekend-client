import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from '../components/Moments/Moment'
import Navbar from '../components/Layout/Navbar'
import axios from 'axios'
//mui imports
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class moment extends React.Component {
  state={
    loadingMoment: true,
    moment: null,
    error: ''
  }
  componentDidMount() {
    axios.get('/getMoment/'+this.props.match.params.momentId).then(res => {
      this.setState({
        loadingMoment: false,
        moment: res.data
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        loadingMoment: false,
        error: 'Something went wrong!'
      })
    })
  }
  render () {
    const {moment, loadingMoment, error} = this.state
    return(
      <Fragment style={{textAlign: 'center'}}>
        <Navbar/>
        {
          loadingMoment ? (
            <CircularProgress size={100} thickness={2}/>
          ) : (
            moment === null ? null : <Moment momentObj={moment}/>
          )
        }
      </Fragment>
    )
  }
}

export default moment;
