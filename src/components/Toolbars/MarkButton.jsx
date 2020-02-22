import React from 'react'
import ToolbarButton from './ToolbarButton'
import { useSlate } from 'slate-react'

const MarkButton = React.forwardRef(
  ({ tooltip, icon, mark, onClick, ...props }, ref) => {

    const editor = useSlate()

    /** toggles mark onClick */
    const handleOnClick = (event) => {
      editor.toggleMark(mark)
      onClick && onClick({ editor, mark, event })
    }

    return (
      <ToolbarButton
        tooltip={tooltip ? tooltip : (mark.charAt(0).toUpperCase() + mark.substring(1))} icon={icon}
        active={editor.isMarkActive()}
        ref={ref}
        onClick={event => handleOnClick(event)}
        {...props}
      />
    )
  })

MarkButton.propTypes = {

}
export default MarkButton

