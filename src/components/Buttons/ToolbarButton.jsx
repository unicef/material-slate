import React from 'react'
import { useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@material-ui/core'
import { RadioButtonUnchecked } from '@material-ui/icons'

/** 
 * ToolbarButton is the base button for the toolbar. Based on the `active` status it shows a different look and feel.  
 * 
 * It has a tooltip
 */
const ToolbarButton = React.forwardRef(
  ({ tooltip, placement, icon, block, mark, onMouseDown, ...props }, ref) => {

    const editor = useSlate()


    console.assert(mark || block, 'ToolbarButton. You need to set either prop.mark or prop.block')
    console.assert(!(mark && block), 'ToolbarButton should have only one. Either prop.mark or prop.block')

    const defaultTooltip = () => {
      if (mark) { return mark.charAt(0).toUpperCase() + mark.substring(1) }
      if (block) { return block.charAt(0).toUpperCase() + block.substring(1) }
      return "Mark or Block missing"
    }

    /** toggles mark| block oand forwards the onClick event */
    const handleOnMouseDown = (event) => {
      event.preventDefault()
      if (mark) editor.toggleMark(mark)
      if (block) editor.toggleBlock(block)
      onMouseDown && onMouseDown({ editor, mark, event })
    }

    const isActive = () => {
      if (mark) { return editor.isMarkActive(mark) }
      if (block) { return editor.isBlockActive(block) }
      return false
    }
    return (
      <Tooltip title={tooltip ? tooltip : defaultTooltip()} placement={placement}>
          <IconButton
            aria-label={tooltip ? tooltip : defaultTooltip()}
            ref={ref}
            color={isActive() ? 'secondary' : 'default'}
            onMouseDown={(event) => handleOnMouseDown(event)}
            {...props}
          >
            {icon}
           </IconButton> 
          </Tooltip>
      )
})
    
    export default ToolbarButton
    
ToolbarButton.defaultProps = {
          placement: 'top',
  icon: <RadioButtonUnchecked />
        }
        
        // PropTypes
ToolbarButton.propTypes = {
          /** Text displayed on the tooltip. Default is mark or block string capitalized */
          tooltip: PropTypes.string,
        /** Location where the tooltip will appear. It can be `top`, `bottom`, `left`, `right`. Defaults to top. */
        placement: PropTypes.string,
        /** Boolean that indicates if the button is pressed or not. */
        active: PropTypes.bool,
        /* Icon typically from @material-ui/icons */
        icon: PropTypes.object
}