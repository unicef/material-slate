import React from 'react'
import { useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import IconButton  from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked'

/** 
 * ToolbarButton is the base button for the toolbar.  
 * It requires the 'type' of action to perform and the format that will be added.
 * 
 * It displays a tooltip text on hover. If tooltip text is not passed as a prop it will use the capitalized text of the format
 */
const ToolbarButton = React.forwardRef(
  ({ tooltip, placement, icon, type, format, onMouseDown, isActive, ...props }, ref) => {

    const editor = useSlate()

    const defaultTooltip = () => {
      return (format.charAt(0).toUpperCase() + format.substring(1)).replace('-', ' ')
    }

    /** 
     * Toggles mark| block and forwards the onMouseDown event 
     */
    const handleOnMouseDown = (event) => {
      event.preventDefault()
      switch(type) {
        case 'mark':
          editor.toggleMark(format)
        case 'block':
          editor.toggleBlock(format)
      }
      onMouseDown && onMouseDown({ editor, format, type, event })
    }
    
    const checkIsActive = () => {
      if (isActive) {
        return isActive()
      }
      
      switch(type) {
        case 'mark':
          return editor.isMarkActive(format)
        case 'block':
          return editor.isBlockActive(format)
      }
      return 
    }

    return (
      <Tooltip title={tooltip ? tooltip : defaultTooltip()} placement={placement}>
        <IconButton
          aria-label={tooltip ? tooltip : defaultTooltip()}
          ref={ref}
          color={checkIsActive() ? 'secondary' : 'default'}
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
}

// PropTypes
ToolbarButton.propTypes = {
  /** 
   * Text displayed on the button tooltip. By Default it is the capitalized `format` string. 
   * For instance, `bold` is displayed as `Bold`.
   */
  tooltip: PropTypes.string,

  /** 
   * Location where the tooltip will appear. 
   * It can be `top`, `bottom`, `left`, `right`. Defaults to top. 
   */
  placement: PropTypes.string,

  /** 
   * Toolbar button has the option of adding to the editor value marks and blocks.
   * 
   * `mark` can be added to the editor value when you want to add something like `bold`, `italic`...
   *  Marks are rendered into HTML in `renderLeaf` of `MaterialEditable`
   * 
   * `block` to be added to the editor `value` when the button is pressed. For example: `header1`, `numbered-list`...
   *  `renderElement` of the `RichEditable` component will need to handle the actual conversion from mark to HTML/Component on render time.
   * 
   * If you don't want to add a mark or a block do not set this prop. You can perform the action onMouseDown())
  */
  type: PropTypes.string,

  /**
   * 
   * The string that identifies the format of the block or mark to be added. For example: `bold`, `header1`... 
  */
  format: PropTypes.string.isRequired,

  /**
   * isActive is a function that returns true/false to indicate the status of the mark/block.
   * Set this function if you need to handle anything other than mark or blocks.
   */
  isActive: PropTypes.func,

  /** 
   * Instance a component. The icon that will be displayed. Typically an icon from @material-ui/icons 
   */
  icon: PropTypes.object,

  /**
   * On mouse down event is passed up to the parent with props that can be deconstructed in {editor, event, mark/block}
   */
  onMouseDown: PropTypes.func

}