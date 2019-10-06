import React from 'react';
import PropTypes from 'prop-types'
import DeleteMoment from '../Dialogs/DeleteMoment'
import ReportMoment from '../Dialogs/ReportMoment'
//mui imports
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//redux imports
import {connect} from 'react-redux'

const ITEM_HEIGHT = 48;

function MomentAction(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        style={{
          padding: 0,
          position: 'absolute',
        }}
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
      {
        props.followers.includes(props.handle) ? <MenuItem key={1} onClick={handleClose}>
          <ReportMoment momentId={props.momentId}/>
        </MenuItem> : null
      }
      </Menu>
    </div>
  );
}

MomentAction.propTypes = {
  handle: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps)(MomentAction)
