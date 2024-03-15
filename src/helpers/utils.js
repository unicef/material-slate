import { Editor } from 'slate'

/**
 * get the range of the tagged user
 * @param {Object} editor editor object
 * @param {Object} start start position point in the editor
 * @param {Number} maxDistance distance(words)in which the people picker will work with (separated by spaces)
 * @returns start range of the tagged user
 */
export const getBeforeRangeOfTagging = (editor, start, maxDistance = 3) => {
  let taggingBeforeRange = null
  for (let i = 1; i <= maxDistance; i++) {
    const wordBefore = Editor.before(editor, start, {
      unit: 'word',
      distance: i,
    })
    const before = wordBefore && Editor.before(editor, wordBefore)
    const beforeRange = before && Editor.range(editor, before, start)
    const beforeText = beforeRange && Editor.string(editor, beforeRange)
    // this is to avoid to overpass any tagged that is in the middle when typing
    // (eg. @dey [other user tagged] yner - tagged users are not considered as words, but as space )
    const spacesAndDistanceAreCorrect =
      beforeText && i === beforeText.split(' ').filter(t => t).length
    if (
      beforeText &&
      beforeText.startsWith('@') &&
      spacesAndDistanceAreCorrect
    ) {
      taggingBeforeRange = beforeRange
      break
    }
  }
  return taggingBeforeRange
}
