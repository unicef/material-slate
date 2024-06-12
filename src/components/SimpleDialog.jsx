import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from '@mui/material'

const StyledBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
}))

/**
 * Simple dialog box with a text field and two buttons Cancel and Save.
 * Three props need to be set:
 *
 *  1. `onCancel` called when the cancel button is pressed ,
 *  2. `onSave` called when the save button is pressed
 *  3. open, boolean that indicates if the dialog is displayed (true) or not (false)
 *
 */
export default function SimpleDialog({
  open,
  title,
  label,
  format,
  defaultValue,
  onCancel,
  onSave,
  ...props
}) {
  const [value, setValue] = useState(defaultValue)

  //Calls `onCancel` prop and sets the default value
  const handleOnCancel = format => {
    onCancel()
    setValue(defaultValue)
  }
  // Calls `onSave` prop and sets the default value
  const handleOnSave = event => {
    onSave({ format, value })
    setValue(defaultValue)
  }

  return (
    <Dialog
      open={open}
      onClose={handleOnCancel}
      aria-labelledby="dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={props.maxWidth ? props.maxWidth : 'xs'}
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <StyledBox>
          <TextField
            fullWidth
            multiline
            autoFocus
            defaultValue={defaultValue}
            label={label}
            variant="outlined"
            onChange={event => setValue(event.target.value)}
            required
          />
        </StyledBox>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleOnCancel()}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={event => handleOnSave(event)}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  /**
   * If it is true, it displays the dialog window.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Called whe the Cancel button is pressed
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Called when the save button is pressed
   */
  onSave: PropTypes.func.isRequired,

  /**
   * Title of the dialog window
   */
  title: PropTypes.string,

  /**
   * Label of the textfield
   */
  label: PropTypes.string,

  /**
   * Format of the element to be added/edited.
   * For example: bold, italic, comment, link, endnote
   *
   * Just required if you use the same dialog for different type of nodes.
   */
  format: PropTypes.string,

  /**
   * Default value displayed on the textfield.
   */
  defaultValue: PropTypes.string,
}
