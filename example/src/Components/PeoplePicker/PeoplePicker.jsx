import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Fragment } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: theme.spacing(35),
    overflowY: 'auto',
  },
  rootListItem: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
  focusedItem: {
    background: theme.palette.grey[200],
  },
}))

/**
 *
 * @param {String} targetKey key pressed
 * Hook to respond to key press
 */
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false)

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })

  return keyPressed
}

const options = [
  { value: 'deyner@some.com', label: 'Deyner Lezcano' },
  { value: 'juan@some.com', label: 'Juan Merlos' },
  { value: 'vinu@some.com', label: 'Vinu Ganesan' },
]

export default function PeoplePicker({ onChange, searchingString }) {
  const classes = useStyles()
  const [optionsToDisplay, setOptionsToDisplay] = useState(null)
  const upPress = useKeyPress('ArrowUp')
  const downPress = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')
  const tabPress = useKeyPress('Tab')
  const [cursor, setCursor] = useState(0)
  const refs =
    options &&
    options.reduce((accumulator, child, index) => {
      accumulator[index] = React.createRef()
      return accumulator
    }, {})

  // useEffect to select users from graph on initial load
  useEffect(() => {
    if (searchingString && searchingString.trim().length !== 0) {
      setOptionsToDisplay(
        options.filter(
          o =>
            o.label.indexOf(searchingString) > -1 ||
            o.value.indexOf(searchingString) > -1
        )
      )
    }
  }, [searchingString])

  useEffect(() => {
    if (options && options.length && downPress) {
      const newCursorPosition =
        cursor < options.length - 1 ? cursor + 1 : cursor
      setCursor(newCursorPosition)
      //scroll to the correct position
      refs[newCursorPosition].current.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [downPress])

  useEffect(() => {
    if (options && options.length && upPress) {
      const newCursorPosition = cursor > 0 ? cursor - 1 : cursor
      setCursor(newCursorPosition)
      //scroll to the correct position
      refs[newCursorPosition].current.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [upPress])

  useEffect(() => {
    if (options && Array.isArray(options)) {
      setOptionsToDisplay(options)
      setCursor(0)
    }
  }, [options])

  useEffect(() => {
    if (options.length && (enterPress || tabPress)) {
      onChange && onChange([options[cursor]])
    }
  }, [cursor, enterPress, tabPress])

  const onClickItem = item => {
    onChange && onChange([item])
  }
  return (
    <Box className={classes.root}>
      {optionsToDisplay && optionsToDisplay.length > 0 ? (
        <Fragment>
          {optionsToDisplay.map((item, index) => (
            <ListItem
              ref={refs[index]}
              key={item.value}
              onClick={() => onClickItem(item)}
              component="div"
              className={
                index === cursor
                  ? [classes.rootListItem, classes.focusedItem]
                  : [classes.rootListItem]
              }
            >
              <React.Fragment>
                <Box pl={1} display="flex" flexDirection="column">
                  <Typography variant="body1">{item.label}</Typography>
                  <Typography variant="body2">{item.value}</Typography>
                </Box>
              </React.Fragment>
            </ListItem>
          ))}
        </Fragment>
      ) : (
        <ListItem>
          <Typography variant="body1">No options</Typography>
        </ListItem>
      )}
    </Box>
  )
}

PeoplePicker.propTypes = {
  /** call when user selects an item */
  onChange: PropTypes.func,
  /** string to search across items */
  searchingString: PropTypes.string,
}
