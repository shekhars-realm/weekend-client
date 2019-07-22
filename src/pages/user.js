import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/Profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ProfileSkeleton from '../utils/ProfileSkeleton';

import { connect } from 'react-redux';

class user extends Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const {  loading } = this.props.data;
    //
    // const shoutsMarkup = loading ? (
    //   <ShoutSkeleton />
    // ) : shouts === null ? (
    //   <p>No shouts from this user</p>
    // ) : !shoutIdParam ? (
    //   shouts.map((shout) => <Shout key={shout.shoutId} shout={shout} />)
    // ) : (
    //   shouts.map((shout) => {
    //     if (shout.shoutId !== shoutIdParam)
    //       return <Shout key={shout.shoutId} shout={shout} />;
    //     else return <Shout key={shout.shoutId} shout={shout} openDialog />;
    //   })
    // );

    return (
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps
)(user);
