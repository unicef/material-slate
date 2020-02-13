import React, { useState, useEffect } from 'react'
import EditFootnote from './EditFootnote'

function Footnote(props) {
  const { attributes, footnotes, children } = props

  const [editMode, setEditMode] = useState(false)

  function toggleEditMode() {
    setEditMode(!editMode)
  }

  return (
    <React.Fragment>
      {children}
      <a {...attributes} role="link" tabIndex={0} onClick={toggleEditMode}>
        {editMode ? <sup>2</sup> : <sup>1</sup>}
      </a>
    </React.Fragment>
  )
}

export default Footnote
