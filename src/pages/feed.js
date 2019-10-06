import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from '../components/Moments/Moment'
import Navbar from '../components/Layout/Navbar'
import MomentListSkeleton from '../components/Skeletons/MomentListSkeleton'
//mui imports
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Error from '@material-ui/icons/Error'
import CircularProgress from '@material-ui/core/CircularProgress';
//redux imports
import {connect} from 'react-redux';
import {getUserTimeline} from '../redux/actions/momentActions'

const styles = theme => ({
  momentsContainer: {
    maxWidth: 600,
    margin: 'auto'
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
  },
  loadMore: {
    background: 'transparent',
    boxShadow: 'none',
    width: '100%',
    color: 'black',
    paddingBottom: 20
  },
  progressSpinner: {
    position: 'absolute',
    left:'37%',
    top: '40%'
  }
})

class feed extends React.Component {
  state={
    noNextPage: false
  }
  componentDidMount() {
    if(this.props.timeline.length === 0) {
      this.props.getUserTimeline(new Date().toISOString(), false)
    }
  }
  render () {
    const {classes, timeline, fetchingTimeline, loadMoreTimeline} = this.props;
    return(
      <div className={classes.momentsContainer}>
        {
          fetchingTimeline ? <CircularProgress color='secondary' size={100} thickness={2} className={classes.progressSpinner}/> : (
              timeline.length > 0 ? timeline.map(post => {
                return(
                  <Moment momentObj={post.data}/>
                )
              }) : <div className={classes.noMoments}>
                <Error className={classes.errorIcon}/>
                <Typography variant='h5'>No moments to show</Typography>
                <Typography variant='body1'>Join/Create events to get to know some amazing people and share moments with them!</Typography>
              </div>
          )
        }
        {
          timeline.length < 9 ? null : <Button className={classes.loadMore} variant='contained' onClick={() => {this.props.getUserTimeline(timeline[timeline.length - 1].createdAt, true)}} id='loadMore'>
          {
            loadMoreTimeline ? <CircularProgress style={{position: 'absolute'}} size={30} thickness={2}/> : 'Load more'
          }
          </Button>
        }
      </div>
    )
  }
}

feed.propTypes = {
  timeline: PropTypes.array.isRequired,
  fetchingTimeline: PropTypes.bool.isRequired,
  loadMoreTimeline: PropTypes.bool.isRequired,
  getUserTimeline: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  timeline: state.moment.timeline,
  fetchingTimeline: state.moment.fetchingTimeline,
  loadMoreTimeline: state.moment.loadMoreTimeline
})

export default connect(mapStateToProps, {getUserTimeline})(withStyles(styles)(feed));
