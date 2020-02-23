import React from 'react'
import { useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@material-ui/core'
import { RadioButtonUnchecked } from '@material-ui/icons'

/** 
 * ToolbarButton is the base button for the toolbar.  
 * It requires to have either the string prop block (to add a block mark) or the string prop mark (to add an inline mark)
 * 
 * It displays the tooltip text on hover. If tooltip text is not passed it will use the  block/mark
 */
const ToolbarButton = React.forwardRef(
  ({ tooltip, placement, icon, block, mark, fullButtonControl, onMouseDown, ...props }, ref) => {

    const editor = useSlate()


    console.assert(mark || block, 'ToolbarButton. You need to set either prop.mark or prop.block')
    console.assert(!(mark && block), 'ToolbarButton should have only one. Either prop.mark or prop.block')

    const defaultTooltip = () => {
      if (mark) { return mark.charAt(0).toUpperCase() + mark.substring(1) }
      if (block) { return block.charAt(0).toUpperCase() + block.substring(1) }
      return "Mark or Block missing"
    }

    /** Toggles mark| block and forwards the onClick event except if fullButtonControl is true that
     * directly forwards onMouseDown to parent.
     */
    const handleOnMouseDown = (event) => {
      event.preventDefault()
      if (fullButtonControl) {
        return onMouseDown({ editor, mark, event })
      }
      if (mark) {
        editor.toggleMark(mark)
        onMouseDown && onMouseDown({ editor, mark, event })
      }
      if (block) {
        editor.toggleBlock(block)
        onMouseDown && onMouseDown({ editor, block, event })
      }
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
  icon: <RadioButtonUnchecked />,
  fullButtonControl: false
}

// PropTypes
ToolbarButton.propTypes = {
  /** Text displayed on the button tooltip. By Default it is the capitalized mark/block string (for instance, `bold` mark is displayed as `Bold`) */
  tooltip: PropTypes.string,
  /** Location where the tooltip will appear. It can be `top`, `bottom`, `left`, `right`. Defaults to top. */
  placement: PropTypes.string,
  /** 
   * Mark to be added to the editor value when the button is pressed. For example: `bold`, `italic`...
   *  
   * `renderLeaf` of the `RichEditable` component will need to handle the actual conversion from mark to HTML/Component on render time.
  */
  mark: PropTypes.string,

  /**
   *  Block to be added to the editor `value` when the button is pressed. For example: `header1`, `numbered-list`...
   *  
   * `renderElement` of the `RichEditable` component will need to handle the actual conversion from mark to HTML/Component on render time.
  */
  block: PropTypes.block,

  /* Icon of the button typically from @material-ui/icons */
  icon: PropTypes.object,
  /** 
   * By default toolbar button will add the mark or block to the value of the editor and then give you
   * the control passing you the onMouseDown eventThat may be fine for adding buttons that do not require anything special
   * However, if you need the editor content not to be changed before you get the `onMouseDown` event, set this to true.
   */
  fullButtonControl: PropTypes.bool,
  /**
   * On mouse down event is passed up to the parent with props that can be deconstructed in {editor, event, mark/block}
   */
  onMouseDown: PropTypes.func

}