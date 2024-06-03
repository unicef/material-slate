import React, { Fragment } from 'react'
import { useFocused, useSelected } from 'slate-react'

/**
 * @param {Object} props props for the mention element
 */
export default function MentionElement(props) {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const textChild = element && element.children && element.children[0]
  return (
    <Fragment>
      {textChild ? (
        <span
          {...attributes}
          contentEditable={false}
          style={{
            padding: '3px 3px 2px',
            margin: '0 1px',
            verticalAlign: 'baseline',
            display: 'inline-block',
            borderRadius: '4px',
            backgroundColor: '#eee',
            fontSize: '0.9em',
            boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
          }}
        >
          @{textChild.text}
          {children}
        </span>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  )
}
