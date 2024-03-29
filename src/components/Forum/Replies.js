import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
//mui Imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  horizontalDivider: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  commentImage: {
    maxWidth: 55,
    height: 55,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginleft: 20
  }
})

class Replies extends Component {

  render () {
    console.log('in replies', this.props.replies);
    const {replies, classes} = this.props;
    return (
      <Grid container>
        {
          replies.length > 0 ? replies.map((reply, index) => {
            const {body, createdAt, userImage, user} = reply;
            const time = dayjs(createdAt).fromNow();
            return (
              <Fragment>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img src={userImage} alt='comment' className={classes.commentImage}/>
                    </Grid>
                    <Grid item sm={9}>
                      <div className={classes.commentData}>
                        <Typography variant="h6" color="primary" component={Link} to={`/profile/${user}`}>{user}</Typography>
                        <Typography variant='caption' color='default'>, {time}</Typography>
                        {/*<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow('h:mm a,MMMM DD YYYY')}</Typography>*/}
                        <Typography variant="h5">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            )
          }) : <p className={classes.noReply}>No replies yet</p>
        }
      </Grid>
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array.isRequired
}

export default withStyles(styles)(Replies);
