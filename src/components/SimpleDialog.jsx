import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/BUtton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle' 
import DialogContent from '@material-ui/core/DialogContent' 
import DialogActions from '@material-ui/core/DialogActions'

export default function SimpleDialog({ open, title, label, format, defaultValue, onCancel, onSave, ...props }) {

  const [value, setValue] = useState(defaultValue)

  const handleOnCancel = (format) => {
    onCancel() 
    setValue(defaultValue)
  }

  const handleOnSave = (event) => {
    //TODO validate input
    onSave({format, value})
    setValue(defaultValue)
  }

  return (
    <Dialog
      open={open}
      onClose={handleOnCancel}
      aria-labelledby="dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={props.maxWidth ? props.maxWidth : 'xs' }
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField fullWidth multiline autoFocus defaultValue={defaultValue} label={label} variant="outlined"  
        onChange={(event) => setValue(event.target.value) }required />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleOnCancel()} color="primary" variant='outlined'>
          Cancel
          </Button>
        <Button onClick={(event)=> handleOnSave(event)} color="primary" variant='contained'>
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
}

// TODO document this
SimpleDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};