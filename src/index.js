// slate package overwrites
import MaterialEditor from './slate/MaterialEditor'
import createMaterialEditor from './slate/createMaterialEditor'

//plugins
import withComments from './plugins/withComments'
import withEndnotes from './plugins/withEndnotes'
import withCounter from './plugins/withCounter'
import withLinks from './plugins/withLinks'

// slate-react package overwrites
import MaterialSlate from './slate-react/MaterialSlate'
import MaterialEditable from './slate-react/MaterialEditable'
import defaultRenderElement from './slate-react/defaultRenderElement'
import defaultRenderLeaf from './slate-react/defaultRenderLeaf'
import defaultHotKeys from './slate-react/defaultHotkeys'

//Toolbar and base button components
import Toolbar from './components/Toolbars/Toolbar'
import HoveringToolbar from './components/Toolbars/HoveringToolbar'
import ToolbarButton from './components/Buttons/ToolbarButton'
import ButtonSeparator from './components/Buttons/ButtonSeparator'
import SimpleDialog from './components/SimpleDialog'
//Block and mark Buttons
import BoldButton from './components/Buttons/BoldButton'
import ItalicButton from './components/Buttons/ItalicButton'
import StrikethroughButton from './components/Buttons/StrikethroughButton'
import CodeButton from './components/Buttons/CodeButton'
import UnderlinedButton from './components/Buttons/UnderlinedButton'
import BulletedListButton from './components/Buttons/BulletedListButton'
import NumberedListButton from './components/Buttons/NumberedListButton'
import AddCommentButton from './components/Buttons/AddCommentButton'
import EndnoteButton from './components/Buttons/EndnoteButton'
import LinkButton from './components/Buttons/LinkButton'
// Render Elements
import CommentElement from './components/Elements/CommentElement'
import EndnoteElement from './components/Elements/EndnoteElement'
//Counters
import WordCounter from './components/Counters/WordCounter'
import CharCounter from './components/Counters/CharCounter'

if (process.env.NODE_ENV !== 'production') {
  console.log('MaterialEditor: not in production')
} else {
  console.log('MaterialEditor: production mode')
}

export {
  MaterialEditor,
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  withComments,
  withEndnotes,
  defaultRenderElement,
  defaultRenderLeaf,
  Toolbar,
  HoveringToolbar,
  ToolbarButton,
  ButtonSeparator,
  BoldButton,
  ItalicButton,
  StrikethroughButton,
  CodeButton,
  UnderlinedButton,
  BulletedListButton,
  NumberedListButton,
  AddCommentButton,
  EndnoteButton,
  CommentElement,
  EndnoteElement,
  SimpleDialog,
  WordCounter,
  CharCounter,
  withCounter,
  withLinks,
  LinkButton,
  defaultHotKeys,
}
