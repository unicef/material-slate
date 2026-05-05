import React from 'react'
import { useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import { Typography, styled } from '@mui/material'

const Text = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
}))

/**
 *
 * WordCounter for editor
 * It displays the number words, below the editor
 *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
 *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
 * Word counter will be displayed with error color, when wordLength exceeds maxWords
 */
export default function WordCounter({ maxWords }) {
  const editor = useSlate()
  const { children } = editor
  // Words length
  const wordsLength = editor.getWordsLength(children)
  // Error based on words length limit
  const errorExceedWordsLimit = wordsLength > maxWords

  return (
    <Text
      variant="subtitle2"
      color="textSecondary"
      sx={{ ...(errorExceedWordsLimit && { color: 'error.main' }) }}
    >
      {maxWords ? `${wordsLength} / ${maxWords}` : wordsLength} words
    </Text>
  )
}

WordCounter.propTypes = {
  /**
   * To display maximum words in counter
   *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
   *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
   */
  maxWords: PropTypes.number,
}
