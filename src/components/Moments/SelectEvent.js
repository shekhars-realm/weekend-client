import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  selectEvent: {
    fontWeight: 700,
    marginLeft: 10
  }
}));

export default function SelectEvent(props) {
  console.log('in select: ', props.events);
  const events = props.events
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.selectedEvent(events[index])
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <Typography variant='body1'>{events[selectedIndex].eventName}</Typography>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {events.map((event, index) => (
          <MenuItem
            key={event.eventId}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {event.eventName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
