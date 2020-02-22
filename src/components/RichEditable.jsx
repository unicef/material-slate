import React, { useCallback } from 'react'
import { Editable } from 'slate-react'
import PropTypes from 'prop-types'

/**
 * Wrapper of Slate Editable
 *  
 */
export default function RichEditable({ renderElement, renderLeaf, placeholder, children }) {

  // Define a rendering function based on the element passed to `props`. 
  // Props is deconstructed in the {element, attributes, children, rest (any other prop)
  // We use `useCallback` here to memoize the function for subsequent renders.
  const handleRenderElement = useCallback(({ element, children, attributes, ...rest }) => {
    switch (element.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return renderElement({ element, attributes, children, rest })
    }
  }, [])

  const handleRenderLeaf = useCallback(({ leaf, attributes, children, ...rest }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
    if (leaf.code) {
      children = <code>{children}</code>
    }
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if (leaf.underline) {
      children = <u>{children}</u>
    }
    return renderLeaf({ leaf, attributes, children, rest })
  }, [])

  return (
    <Editable
      renderElement={props => handleRenderElement(props)}
      renderLeaf={props => handleRenderLeaf(props)}
      placeholder={placeholder}
    >{children}</Editable>
  )
}

// Specifies the default values for props:
RichEditable.defaultProps = {
  renderElement: ({ element, attributes, children, ...rest }) => { return <p {...attributes}>{children}</p> },
  renderLeaf: ({ leaf, attributes, children, ...rest }) => { return <span {...attributes}>{children}</span> },
  placeholder: "Type some text..."
};

// TODO add info about arguments in functions

RichEditable.propTypes = {
  /** Called when an element needs to be rendered */
  renderElement: PropTypes.func,
  /** Called when a leaf needs to be rendered */
  renderLeaf: PropTypes.func,
  /** Text to display when there are no contents on the editor. Default" "Type some text..." */
  placeholder: PropTypes.string
}