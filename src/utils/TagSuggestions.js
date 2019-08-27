import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
//mui imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';


const suggestions = [
  { label: 'hiking' },
  { label: 'disco' },
  { label: 'running' },
  { label: 'biking' },
  { label: 'drinks' },
  { label: 'dance' },
  { label: 'running' },
  { label: 'yoga' },
  { label: 'coffee' },
  { label: 'brunch' },
  { label: 'breakfast' },
  { label: 'lunch' },
  { label: 'dinner' },
  { label: 'race' },
  { label: 'marathon' },
  { label: 'park' },
  { label: 'amusement park' },
  { label: 'rides' },
  { label: 'meuseum' },
  { label: 'cycling' },
  { label: 'drinking' },
  { label: 'biking' },
  { label: 'paint ball' },
  { label: 'cards' },
  { label: 'netflix' },
  { label: 'sunset' },
  { label: 'movies' },
  { label: 'roadtrip' },
  { label: 'pub' },
  { label: 'party' },
  { label: 'games' },
  { label: 'ps4' },
  { label: 'xbox' },
  { label: 'game night' },
  { label: 'jogging' }
];

function renderInput(inputProps) {
  const { InputProps, classes, errors, ref, ...other } = inputProps;

  return (
    <TextField
      id="tags"
      fullWidth
      margin="normal"
      variant="outlined"
      error={errors.tags ? true : false}
      helperText={errors.tags}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

export default function DownshiftMultiple(props) {
  const { classes, errors } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);

  function handleKeyDown(event) {
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
    props.selectedTags(newSelectedItem)
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    props.selectedTags(newSelectedItem)
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Select your event type',
        });

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              errors,
              classes,
              label: 'Tags',
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus,
              },
              inputProps,
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};
