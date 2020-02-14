import React, { useState, useEffect } from 'react'

export default function Footnote(props) {
  const { attributes, footnotes, children, element } = props
  const [editMode, setEditMode] = useState(!element.footnoteText)

  const existingFootnote = element.footnoteText ? element : null

  function toggleEditMode() {
    setEditMode(!editMode)
    // alert(`footnote:${element.footnoteText}`)
    // setEditMode(!editMode)
  }

  // useEffect(() => {
  //   const currentFootnote = footnotes.filter(item => {
  //     return item.id === existingFootnote.id
  //   })
  // }, [footnotes])

  // useEffect(() => {}, [element.footnoteText, footnotes])

  return (
    <span {...attributes}>
      {children}
      <a
        contentEditable={false}
        role="link"
        tabIndex={0}
        onClick={toggleEditMode}
      >
        <sup>{1}</sup>
      </a>
    </span>
  )
}
