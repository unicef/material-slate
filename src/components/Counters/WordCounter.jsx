import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
  textError: {
    color: theme.palette.error.main,
  },
}))

/**
 *
 * WordCounter for editor
 * It displays the number words, below the editor
 *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
 *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
 * Word counter will be displayed with error color, when wordLength exceeds maxWords
 */
export default function WordCounter({ wordsLength, maxWords }) {
  const classes = useStyles()
  // Error based on words length limit
  const errorExceedWordsLimit = wordsLength > maxWords

  return (
    <Typography
      variant="subtitle2"
      color="textSecondary"
      className={`${classes.text} ${errorExceedWordsLimit &&
        classes.textError}`}
    >
      {maxWords ? `${wordsLength} / ${maxWords}` : wordsLength} words
    </Typography>
  )
}

WordCounter.propTypes = {
  /**
   * Number of words in editor
   * Get wordsLength using `editor.getWordsLength()`
   */
  wordsLength: PropTypes.number,
  /**
   * To display maximum words in counter
   *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
   *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
   */
  maxWords: PropTypes.number,
}
