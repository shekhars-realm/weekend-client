import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import {withStyles} from '@material-ui/core/styles';
//redux imports
import {connect} from 'react-redux';
//import {postReply} from '../../redux/actions/forumActions';

const styles = theme => ({

  replyForm: {
    display: 'flex',
    width: '100%',
    marginTop: 20
  }
})

class ReplyForm extends React.Component {
  state = {
    errors: {},
    reply: ''
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.reply === '') {
      const errors = {
        reply: 'cannot leave empty!'
      }
      this.setState({errors})
    } else {
      const obj = {
        body: this.state.reply,
        forumId: this.props.forumId
      }
      axios.post('/reply/add', obj).then(res => {
        this.props.replyCountChange()
        this.setState({reply: ''})
      }).catch(err => {
        const errors = {
          reply: 'Something went wrong!'
        }
        this.setState({errors})
      })
    }
  }
  render () {
    const {classes} = this.props
  return(
    <form className={classes.replyForm} onSubmit={this.handleSubmit}>
      <TextField
        name='reply'
        type='text'
        placeholder={'Reply'}
        error={this.state.errors.reply ? true : false}
        helperText={this.state.errors.reply}
        fullWidth
        onChange={this.handleChange}
      />
      <Button type='submit' color='secondary'><Send/></Button>
    </form>
  )
  }
}

ReplyForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReplyForm);
