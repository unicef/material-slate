
// Editor stuff
import MaterialEditor from './helpers/MaterialEditor'

// General components
import MaterialSlate from './components/MaterialSlate'
import MaterialEditable from './components/MaterialEditable'
import createMaterialEditor from './helpers/createMaterialEditor'

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


if (process.env.NODE_ENV !== 'production') {
  console.log('MaterialEditor: not in production');
} else {
  console.log('MaterialEditor: production mode');
}

export {
    MaterialEditor,
    MaterialSlate,
    MaterialEditable,
    createMaterialEditor,
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
  
    SimpleDialog
}


