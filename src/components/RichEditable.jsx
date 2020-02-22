import React, {useCallback} from 'react'
import { Editable } from 'slate-react'
import PropTypes from 'prop-types'

/**
 * Wrapper of Slate Editable
 *  
 */
export default function RichEditable( {renderElement, placeholder, children}) {

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const handleRenderElement = useCallback(props => {
    switch (props.element.type) {
      case 'bold':
        console.log("bold")
      default:
        //console.log("defaultRenderElement")
        return renderElement(props)
    }
  }, [])

  
    return(
        <Editable
            renderElement={props => handleRenderElement(props)}
            placeholder={placeholder}
        >{children}</Editable>
    )
}

// Specifies the default values for props:
RichEditable.defaultProps = {
    renderElement: props => {return <p {...props}>{props.children}</p>},
    placeholder: "Type some text..."
};

RichEditable.propTypes = {
/** Called when an element needs to be rendered */
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}