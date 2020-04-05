import MaterialEditor from '../slate/MaterialEditor'

/**
 * Helper functions for managing inline marks
 * 
 * @param {Editor} editor 
 */
const withMarks = editor => { 
  
  /**
   * Checks if the mark is active
   * 
   * @param {String} mark Mark to validate For example: 'bold', 'italic'
   */
  editor.isMarkActive = mark => {
    const marks = MaterialEditor.marks(editor)
    return marks ? marks[mark] === true : false
  }

  /**
   * Toggles on/off the mark. If the mark exists it is removed and vice versa.
   *   
   * @param {String} mark Mark to validate For example: 'bold', 'italic'
   */ 
   editor.toggleMark = mark => { 
    editor.isMarkActive(mark) ? MaterialEditor.removeMark(editor, mark) : MaterialEditor.addMark(editor, mark, true)
  }
  return editor
}

export default withMarks