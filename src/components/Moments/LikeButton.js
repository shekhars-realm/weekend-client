import React from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../utils/MyButton';
import {Link} from 'react-router-dom';
//redux imports
import {connect} from 'react-redux';
import {likeMoment, unlikeMoment} from '../../redux/actions/momentActions';
//icon imports
import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';

class LikeButton extends React.Component {
  state={
    liked:  false,
  }
  componentDidMount() {
    if(this.props.user.likes && this.props.user.likes.find(id => id === this.props.momentId)) {
      this.setState({liked: true})
    } else {
      this.setState({liked: false})
    }
  }

  likeMoment = () => {
    this.setState({
      liked: true
    })
    this.props.changeLikeCount('like')
    this.props.likeMoment(this.props.momentId);
  }

  unlikeMoment = () => {
    this.setState({
      liked: false
    })
    this.props.changeLikeCount('unlike')
    this.props.unlikeMoment(this.props.momentId);
  }

  render () {
    console.log(this.state.likeCount);
    const {authenticated} = this.props.user;
    const likeButton = !authenticated ? (
      <MyButton tip='like'>
        <Link to='/login'>
          <FavouriteBorder color='primary'/>
        </Link>
      </MyButton>
    ) : (
      this.state.liked ? (
        <MyButton tip='unlike' onClick={this.unlikeMoment }>
          <FavouriteIcon style={{color: '#e10600'}}/>
        </MyButton>
      ) : (
        <MyButton tip='like' onClick={this.likeMoment}>
          <FavouriteBorder style={{color: '#e10600'}}/>
        </MyButton>
      )
    )
    return likeButton;
  }
}

LikeButton.propTypes = {
  likeMoment: PropTypes.func.isRequired,
  unlikeMoment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  momentId: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  likeMoment, unlikeMoment
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
