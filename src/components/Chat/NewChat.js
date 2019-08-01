import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
const firebase = require("firebase");

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    position: 'absolute',
    width: '350px',
    top: '50px',
    left: 'calc(50% + 150px - 175px)'
  },
  input: {
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});

class NewChat extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      message: null
    };
  }

  render() {

    const { classes } = this.props;

    return(
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">Send A Message!</Typography>
          <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-username'>
                  {"Enter Your Friend's Email"}
              </InputLabel>
              <Input required
                className={classes.input}
                autoFocus
                onChange={(e) => this.userTyping('username', e)}
                id='new-chat-username'>
              </Input>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
              </InputLabel>
              <Input required
                className={classes.input}
                onChange={(e) => this.userTyping('message', e)}
                id='new-chat-message'>
              </Input>
            </FormControl>
            <Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>Send</Button>
          </form>
          {
            this.state.serverError ?
            <Typography component='h5' variant='h6' className={classes.errorText}>
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
      </main>
    );
  }
  componentWillMount() {
    if(!firebase.auth().currentUser)
      this.props.history.push('/login');
  }
  userTyping = (inputType, e) => {
    switch (inputType) {
      case 'username':
        this.setState({ username: e.target.value });
        break;

      case 'message':
        this.setState({ message: e.target.value });
        break;
      default:
        break;
    }
  }
  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }
  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');
  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  }
  goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);
  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  }
  userExists = async () => {
    const usersSnapshot = await
    firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
      .docs
        .map(_doc => _doc.data().email)
        .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  }
}
export default withStyles(styles)(NewChat);
