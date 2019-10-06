import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import tileData from './tileData';
import $ from 'jquery'
import Moment from './Moment'
//mui imports
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import ImageSearch from '@material-ui/icons/ImageSearch';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles'
//redux imports
import {connect} from 'react-redux';
import {getUserMoments} from '../../redux/actions/momentActions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  gridList: {
    maxWidth: '100%',
    margin: '0 !important',
    overflowY: 'unset'
  },
  videoGrid: {
    left: '50%',
    height: '100%',
    position: 'relative',
    transform: 'translateX(-50%)'
  },
  dialogPaper: {
    height: 'auto',
    background: 'transparent'
  },
  noMomentsText: {
    fontSize: 20,
    fontWeight: 700,
    padding: 20,
    textAlign: 'center'
  },
  progress: {
    margin: '50px auto'
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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class ListMobileView extends React.Component {
  state={
    open: false
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user !== this.props.user) {
      this.props.getUserMoments(this.props.user)
    }
  }
  componentDidMount() {
    this.props.getUserMoments(this.props.user)
    $('video').click(function() {
      console.log('video clicked');
    })
  }
  openMediaDialog = (moment) => {
    console.log('dialog');
    this.setState({open: true,moment: moment})
  }
  render() {
    const {classes, moments, fetchingMoments} = this.props
    return (
      <div className={classes.root}>
        {
          fetchingMoments ? (
            <CircularProgress size={100} thickness={2} className={classes.progress}/>
          ) : (
            moments.length > 0 ? (
              <GridList cellHeight={130} className={classes.gridList} cols={3}>
                {
                  moments.map((moment, index) => (
                      <GridListTile onClick={() => this.openMediaDialog(moment)} style={{padding: 1}} key={moment.id} cols={1}>
                        {
                          moment.initialMedia.type === 'video/mp4' ? <video onclick={() => this.openMediaDialog(moment)} className={classes.videoGrid} controls ><source type='video/mp4' src={moment.initialMedia.url}/></video> : <img src={moment.initialMedia.url} />
                        }
                      </GridListTile>
                    ))
                }
              </GridList>
            ) : (
              <div className={classes.noMoments}>
                <ImageSearch className={classes.errorIcon}/>
                <Typography variant='h5'>No moments found</Typography>
                {
                  this.props.sameUserLoaded ? <Typography variant='body1'>Create/Join events to add precious moments from those events!</Typography> : null
                }
              </div>
            )
          )
        }
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          paperScrollPaper={classes.dialogPaper}
          fullScreen={$(window).width() < 600 ? true : false}
          open={this.state.open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent style={{padding: 0}}>
            <Moment momentObj={this.state.moment}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ListMobileView.propTypes = {
  classes: PropTypes.object.isRequired,
  moments: PropTypes.object.isRequired,
  fetchingMoments: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  moments: state.moment.moments,
  fetchingMoments: state.moment.fetchingMoments
})

export default connect(mapStateToProps, {getUserMoments})(withStyles(styles)(ListMobileView))
