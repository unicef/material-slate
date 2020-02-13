import React, { useState, useRef } from 'react'
import { Button, Menu, Box } from '@material-ui/core'
import { UValidatorForm, UTextField } from '@unicef/material-ui'
// import { getDateAndTime } from '../../../Helpers'

function FootnoteForm(props) {
  const { isEdit, footnote, node, onSave, onRemove, onClose, editorId } = props
  // const footnoteId = getDateAndTime(new Date(), 'timestamp')
  const [footnoteValue, setFootnoteValue] = useState({
    id: footnote.id ? footnote.id : 1,
    number: undefined,
    // editorId: editorId,
    key: node.key,
    text: footnote ? footnote.text : '',
  })

  const footnoteRef = useRef('footnoteRef')

  function handleChange(event) {
    setFootnoteValue({
      ...footnoteValue,
      [event.target.name]: event.target.value,
    })
  }

  function handleRemove(e) {
    e.preventDefault()
    onRemove(footnoteValue)
  }

  function handleSave(e) {
    e.preventDefault()
    onSave(footnoteValue)
  }

  return (
    <Menu
      id="footnote-menu"
      anchorEl={true}
      style={{ left: 250 }}
      MenuListProps={{ component: 'div', style: { display: 'block' } }}
      open={Boolean(true)}
      onClose={onClose}
      PaperProps={{ style: { padding: 16, maxWidth: 500 } }}
    >
      <UValidatorForm ref={footnoteRef} onSubmit={handleSave}>
        <UTextField
          label="footnote"
          name="text"
          value={footnoteValue.text}
          variant="outlined"
          fullWidth
          multiline
          onChange={handleChange}
        />
        <Box style={{ float: 'right', margin: 8 }}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
          {isEdit && (
            <Button
              style={{ marginLeft: 8 }}
              color="default"
              variant="contained"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </Box>
      </UValidatorForm>
    </Menu>
  )
}

export default FootnoteForm
