import React from 'react'

/**
 * Default renderer of leafs. 
 * 
 * Handles the following type of leafs `bold` (strong), `code` (code), `italic` (em), `strikethrough` (del), `underlined`(u).
 * 
 * @param {Object} props 
 */

export default function defaultRenderLeaf({ leaf, attributes, children, text }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }
  if (leaf.underlined) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span> 
}