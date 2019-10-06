import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from './Moment'
import MomentListSkeleton from '../Skeletons/MomentListSkeleton'
//mui imports
import Typography from '@material-ui/core/Typography'
import Error from '@material-ui/icons/Error'
import {withStyles} from '@material-ui/core/styles'
//redux imports
import {connect} from 'react-redux';
import {getUserMoments} from '../../redux/actions/momentActions'

const styles = theme => ({
  momentsContainer: {
    textAlign: 'center'
  },
  noMomentsMsg: {
    fontWeight: 700
  },
  errorIcon: {
    color: 'dodgerblue',
    fontSize: 80
  },
  noMoments: {
    textAlign: 'center',
    padding: '20%'
  }
})

class List extends React.Component {
  componentDidMount() {
    this.props.getUserMoments('shekhar')
  }
  render () {
    const {classes, moments, fetchingMoments} = this.props;
    return(
      <Fragment className={classes.momentsContainer}>
        {
          fetchingMoments ? <MomentListSkeleton/> : (
              moments.length > 0 ? moments.map(moment => {
                return(
                  <Moment momentObj={moment}/>
                )
              }) : <div className={classes.noMoments}>
                <Error className={classes.errorIcon}/>
                <Typography variant='h5'>No moments to show</Typography>
                <Typography variant='body1'>Join/Create events to get to know some amazing people and share moments with them!</Typography>
              </div>
          )
        }
      </Fragment>
    )
  }
}

List.propTypes = {
  moments: PropTypes.array.isRequired,
  fetchingMoments: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  moments: state.moment.moments,
  fetchingMoments: state.moment.fetchingMoments
})

export default connect(mapStateToProps, {getUserMoments})(withStyles(styles)(List));
