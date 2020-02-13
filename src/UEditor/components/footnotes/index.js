import React from 'react'
import Footnote from './Footnote'

export const TYPE = 'footnote'

export default function footnotePlugin() {
  const schema = {
    document: {},
  }

  /* eslint-disable react/prop-types */
  const renderInline = (props, editor, next) => {
    const { node } = props;
    const { value } = editor.props
    console.log(node.type)

    switch (node.type) {
      case TYPE:
        return <Footnote {...props} value={value} />
      default:
        return next();
    }
  }

  return {
    schema,
    renderInline,
  }
}