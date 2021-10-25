'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var slate = require('slate');
var slateReact = require('slate-react');
var slateHistory = require('slate-history');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var Box = _interopDefault(require('@material-ui/core/Box'));
var styles = require('@material-ui/core/styles');
var core = require('@material-ui/core');
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var Tooltip = _interopDefault(require('@material-ui/core/Tooltip'));
var SvgIcon = _interopDefault(require('@material-ui/core/SvgIcon'));
var ReactDOM = _interopDefault(require('react-dom'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var TextField = _interopDefault(require('@material-ui/core/TextField'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogTitle = _interopDefault(require('@material-ui/core/DialogTitle'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var MaterialEditor = _extends({}, slate.Editor);

/**
 *
 * Base plugin for Material Slate.
 *
 * All other plugins assume this plugin exists and has been included.
 *
 * @param {Editor} editor
 */
var withBase = function withBase(editor) {
  /**
   * Is the current editor selection a range, that is the focus and the anchor are different?
   *
   * @returns {boolean} true if the current selection is a range.
   */
  editor.isSelectionExpanded = function () {
    return editor.selection ? slate.Range.isExpanded(editor.selection) : false;
  };

  /**
   * Returns true if current selection is collapsed, that is there is no selection at all
   * (the focus and the anchor are the same).
   *
   * @returns {boolean} true if the selection is collapsed
   */
  editor.isSelectionCollapsed = function () {
    return !editor.isSelectionExpanded();
  };

  /**
   * Is the editor focused?
   * @returns {boolean} true if the editor has focus. */
  editor.isFocused = function () {
    return slateReact.ReactEditor.isFocused(editor);
  };

  /**
   * Unwraps any node of `type` within the current selection.
   */
  editor.unwrapNode = function (type) {
    slate.Transforms.unwrapNodes(editor, { match: function match(n) {
        return n.type === type;
      } });
  };

  /**
   *
   * @param {string} type type of node to be checked. Example: `comment`, `numbered-list`
   *
   * @returns {bool} true if within current selection there is a node of type `type`
   */
  editor.isNodeTypeActive = function (type) {
    var _MaterialEditor$nodes = MaterialEditor.nodes(editor, { match: function match(n) {
        return n.type === type;
      } }),
        _MaterialEditor$nodes2 = slicedToArray(_MaterialEditor$nodes, 1),
        node = _MaterialEditor$nodes2[0];

    return !!node;
  };

  /**
   * Variable for holding a selection may be forgotten.
   */
  editor.rememberedSelection = {};

  /**
   * Gets current selection and stores it in rememberedSelection.
   *
   * This may be useful when you need to open a dialog box and the editor loses the focus
   */
  editor.rememberCurrentSelection = function () {
    editor.rememberedSelection = editor.selection;
  };

  /**
   * Is the current selection collapsed?
   */
  editor.isCollapsed = function () {
    var selection = editor.selection;
    //console.log('selection', selection)

    return selection && slate.Range.isCollapsed(selection);
  };

  /**
   * Wraps a selection with an argument. If `wrapSelection` is not passed
   * uses current selection
   *
   * Upon wrapping moves the cursor to the end.
   *
   * @param {Node} node the node to be added
   * @param {Selection} wrapSelection selection of the text that will be wrapped with the node.
   *
   */
  editor.wrapNode = function (node) {
    var wrapSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    //if wrapSelection is passed => we use it. Use editor selection in other case
    editor.selection = wrapSelection ? wrapSelection : editor.selection;

    // if the node is already wrapped with current node we unwrap it first.
    if (editor.isNodeTypeActive(node.type)) {
      editor.unwrapNode(node.type);
    }
    // if there is no text selected => insert the node.
    //console.log('isLocation', Location.isLocation(editor.selection))
    if (editor.isCollapsed()) {
      //console.log('is collapsed insertNodes')
      slate.Transforms.insertNodes(editor, node);
    } else {
      //text is selected => add the node
      slate.Transforms.wrapNodes(editor, node, { split: true });
      //console.log('editor', editor.children)
      slate.Transforms.collapse(editor, { edge: 'end' });
    }
    // Add {isLast} property to the last fragment of the comment.
    var path = [].concat(toConsumableArray(MaterialEditor.last(editor, editor.selection)[1]));
    //The last Node is a text whose parent is a comment.
    path.pop(); // Removes last item of the path, to point the parent
    slate.Transforms.setNodes(editor, { isLast: true }, { at: path }); //add isLast
  };

  /**
   * Unwraps or removes the nodes that are not in the list.
   *
   * It will search for all the nodes of `type` in the editor and will keep only
   * the ones in the nodesToKeep.
   *
   * It assumes each item of nodesToKeep has an attribute `id`. This attribute will be the discriminator.
   *
   */
  editor.syncExternalNodes = function (type, nodesToKeep) {
    var unwrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    //extracts the id from the nodes and removes those that are not in the list
    var listOfIds = nodesToKeep.map(function (node) {
      return node.id;
    });

    if (unwrap) {
      editor.unwrapNotInList(type, listOfIds);
    } else {
      editor.removeNotInList(type, listOfIds);
    }
    var nodesToKeepObj = {};
    //Update values of nodes.data
    //Create a map by id of the nodes to keep
    nodesToKeep.forEach(function (node) {
      return nodesToKeepObj[node.id] = node;
    });
    //Find nodes of this type remaining in the editor
    var editorNodes = editor.findNodesByType(type);
    //Update them
    editorNodes.map(function (node) {
      slate.Transforms.setNodes(editor, { data: nodesToKeepObj[node.id] }, { match: function match(n) {
          return n.id == node.id;
        }, at: [] });
    });
  };

  /**
   * Removes the nodes that are not in the list of Ids
   *
   * Nodes of type `type` shall have the attribute/property `id`
   *
   * Example:
   * ```
   * {
   *    type: `comment`
   *    id: 30
   *    data: { ... }
   *  }
   * ```
   */
  editor.removeNotInList = function (type, listOfIds) {
    slate.Transforms.removeNodes(editor, {
      match: function match(n) {
        return n.type === type && !listOfIds.includes(n.id);
      },
      at: [] //Search the whole editor content
    });
  };

  /**
   *
   * Unwraps the nodes of `type` whose ids are not in the provided list
   *
   * It assumes the nodes of `type` have an attribute `id`. The `id` may be a number or string.
   *
   * @param {string} type node type to be searched. Example: `comment`
   * @param {Array} listOfIds Array with the list of ids. Example: [1, 2, 3].
   */
  editor.unwrapNotInList = function (type, listOfIds) {
    slate.Transforms.unwrapNodes(editor, {
      match: function match(n) {
        return n.type === type && !listOfIds.includes(n.id);
      },
      at: [] //Search the whole editor content
    });
  };

  /**
   * Gets from current editor content the list of items of a particular type
   */
  editor.findNodesByType = function (type) {
    var list = MaterialEditor.nodes(editor, {
      match: function match(n) {
        return n.type === type;
      },
      at: []
    });
    // List in editor with path and node
    var listWithNodesAndPath = Array.from(list);
    // List with node (element)
    var listWithNodes = listWithNodesAndPath.map(function (item) {
      return item[0];
    });
    //console.log('fondNodesByType ', listWithNodes)
    return listWithNodes;
  };

  /**
   * Returns the serialized value (plain text)
   */
  editor.serialize = function (nodes) {
    return nodes.map(function (n) {
      return slate.Node.string(n);
    }).join('\n');
  };

  /**
   * Functions similar to syncExternalNodes,and also updates the node temporaryId with original id and data
   *
   * First, It will search for match in temporaryId's in nodesToKeep with id's of nodes and updates it with latest data
   * Then, updates data in node id's matching with nodesToKeep id's
   *
   * Unwraps or removes the nodes that are not in the list.
   */
  editor.syncExternalNodesWithTemporaryId = function (type, nodesToKeep) {
    var unwrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    //extracts the id from the nodes and removes those that are not in the list
    var listOfIds = nodesToKeep.map(function (node) {
      return node.id;
    });

    var nodesToKeepObj = {};
    //Update values of nodes.data
    //Create a map by id of the nodes to keep
    nodesToKeep.forEach(function (node) {
      return nodesToKeepObj[node.id] = node;
    });
    //Find nodes of this type remaining in the editor
    var editorNodes = editor.findNodesByType(type);
    //Update them
    editorNodes.map(function (node) {
      // Find the key of node to update
      var key = Object.keys(nodesToKeepObj).find(function (key) {
        return nodesToKeepObj[key].temporaryId === node.id;
      });

      // node to Update with original Id and data
      var nodeToUpdate = nodesToKeepObj[key];
      // If node.id exists
      if (nodesToKeepObj[node.id] && !nodeToUpdate) {
        slate.Transforms.setNodes(editor, { data: nodesToKeepObj[node.id] }, { match: function match(n) {
            return n.id == node.id;
          }, at: [0] });
        // TemporaryId and data will be replaced with new id and data
      } else if (key && nodeToUpdate) {
        slate.Transforms.setNodes(editor, { id: nodeToUpdate.id, data: nodeToUpdate }, { match: function match(n) {
            return n.id == nodeToUpdate.temporaryId;
          }, at: [] });
      } else if (unwrap) {
        // unwraps the nodes in not list
        editor.unwrapNotInList(type, listOfIds);
      } else {
        // removes the nodes in not list
        editor.removeNotInList(type, listOfIds);
      }
    });
  };
  /**
   * Is to get the selected plain text from the editor.selection
   *
   * @returns {string} selected text
   */
  editor.getSelectedText = function () {
    return MaterialEditor.string(editor, editor.rememberedSelection);
  };

  return editor;
};

/**
 * Helper functions for managing inline marks
 * 
 * @param {Editor} editor 
 */
var withMarks = function withMarks(editor) {

  /**
   * Checks if the mark is active
   * 
   * @param {String} mark Mark to validate For example: 'bold', 'italic'
   */
  editor.isMarkActive = function (mark) {
    var marks = MaterialEditor.marks(editor);
    return marks ? marks[mark] === true : false;
  };

  /**
   * Toggles on/off the mark. If the mark exists it is removed and vice versa.
   *   
   * @param {String} mark Mark to validate For example: 'bold', 'italic'
   */
  editor.toggleMark = function (mark) {
    editor.isMarkActive(mark) ? MaterialEditor.removeMark(editor, mark) : MaterialEditor.addMark(editor, mark, true);
  };
  return editor;
};

/**
 * Simple block handling
 * 
 * @param {Editor} editor 
 */
var withBlocks = function withBlocks(editor) {
  editor.LIST_TYPES = ['numbered-list', 'bulleted-list'];

  /**
   * checks if a block is active
   */
  editor.isBlockActive = function (block) {
    var _MaterialEditor$nodes = MaterialEditor.nodes(editor, {
      match: function match(n) {
        return n.type === block;
      }
    }),
        _MaterialEditor$nodes2 = slicedToArray(_MaterialEditor$nodes, 1),
        match = _MaterialEditor$nodes2[0];

    return !!match;
  };

  /**
   * Toggles the block in the current selection
   */
  editor.toggleBlock = function (block) {
    var isActive = editor.isBlockActive(block);
    var isList = editor.LIST_TYPES.includes(block);

    slate.Transforms.unwrapNodes(editor, {
      match: function match(n) {
        return editor.LIST_TYPES.includes(n.type);
      },
      split: true
    });

    //TODO cannot this be generalized??
    slate.Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : block
    });

    if (!isActive && isList) {
      var selected = { type: block, children: [] };
      slate.Transforms.wrapNodes(editor, selected);
    }
  };
  return editor;
};

/**
 * Creates a RichText editor.
 *
 * Includes the following plugins
 *  - withBlocks
 *  - withMarks
 *  - withBase
 *  - withHistory
 *  - withReact
 *
 * @param {string} editorId Optional unique identifier in case you have more than one editor. Defaults to default.
 * @public
 */
function createMaterialEditor() {
  var editorId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

  var editor = withBlocks(withMarks(withBase(slateHistory.withHistory(slateReact.withReact(slate.createEditor())))));
  editor.editorId = editorId;
  return editor;
}

var withComments = function withComments(editor) {
  var isInline = editor.isInline;


  var COMMENT_TYPE = 'comment';

  /**
   * Set comment type not to be an inline element
   */
  editor.isInline = function (element) {
    return element.type === COMMENT_TYPE ? true : isInline(element);
  };

  /**
   * If the editor loses focus upon pressing the `AddCommentButton`, you need to call 
   * editor.rememberCurrentSelection() before the editor loses the focus  
   * 
   * `data` cannot contain the following items: id, type or children.
   */
  editor.addComment = function (id, data) {
    var node = {
      id: id,
      type: COMMENT_TYPE,
      children: [],
      data: data //any data of the comment will be an attribute.
    };
    editor.wrapNode(node, editor.selection || editor.rememberedSelection);
  };

  /**
   * Synchronizes comments.
   * 
   * It receives a list of comments. 
   *  - Comments that are in the editor but not in the list are deleted
   *  - Contents of the comments that are in the list are updated.
   * 
   * Each comment is identified by `id` attribute in the node.
   * 
   * @param {Array} commentsToKeep is a list of comment objects that have an attribute `id`.
   */
  editor.syncComments = function (commentsToKeep) {
    editor.syncExternalNodes(COMMENT_TYPE, commentsToKeep);
  };

  return editor;
};

/**
 * Plugin for handling endnote synced type
 * 
 * Requires withBase plugin
 */
var withEndnotes = function withEndnotes(editor) {
  var isInline = editor.isInline,
      isVoid = editor.isVoid;


  var ENDNOTE_TYPE = 'endnote';

  /**
   * Overwrite to indicate `endnote` nodes are inline
   */
  editor.isInline = function (element) {
    return element.type === ENDNOTE_TYPE ? true : isInline(element);
  };

  /**
   * Overwrite to indicate `endnote` nodes are void
   */
  editor.isVoid = function (element) {
    return element.type === ENDNOTE_TYPE ? true : isVoid(element);
  };

  /**
   * If the editor loses focus upon pressing the `AddEndnoteButton`, you need to call 
   * editor.rememberCurrentSelection() before the editor loses the focus  
   * 
   * `data` cannot contain the following items: id, type or children.
   */
  editor.addEndnote = function (id, data) {
    var text = { text: '' };
    var node = {
      id: id,
      type: ENDNOTE_TYPE,
      children: [text],
      data: data //any data of the comment will be an attribute.
    };
    editor.wrapNode(node, editor.selection || editor.rememberedSelection);
    return node;
  };

  /**
   * Gets the endnote node previous to this one.
   * If there is no endnote, returns null
   */
  editor.previousEndnoteNode = function (endnoteId) {
    var previous = null;
    var endnotes = editor.findNodesByType(ENDNOTE_TYPE);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = endnotes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var endnote = _step.value;

        if (endnote.id === endnoteId) {
          break;
        }
        previous = endnote;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return previous;
  };

  /**
  *  Synchronizes endnotes.
  * 
  * It receives a list of endnotes. 
  *  - Endnotes that are in the editor but not in the list are deleted
  *  - Endnotes of the endnotes that are in the list are updated.
  * 
  * Each endnote is identified by `id` attribute in the node.
  * 
  * @param {Array} endnotesToKeep is a list of endnotes objects that have an attribute `id`.
  */
  editor.syncEndnotes = function (endnotesToKeep) {
    editor.syncExternalNodes(ENDNOTE_TYPE, endnotesToKeep, false);
  };

  return editor;
};

/**
 *
 * Counter plugin for Material Slate.
 *
 * @param {Editor} editor
 */
var withCounter = function withCounter(editor) {
  /**
   * Returns the chars length
   */
  editor.getCharLength = function (nodes) {
    return editor.serialize(nodes).length;
  };

  /**
   * Returns the words length
   *
   */
  editor.getWordsLength = function (nodes) {
    var content = editor.serialize(nodes);
    //Reg exp from https://css-tricks.com/build-word-counter-app/
    return content && content.replace(/\s/g, '') !== '' ? content.match(/\S+/g).length : 0;
  };

  /**
   * Returns the paragraphs length
   */
  editor.getParagraphLength = function (nodes) {
    return nodes.map(function (n) {
      return slate.Node.string(n);
    }).join('\n').split(/\r\n|\r|\n/).length;
  };

  return editor;
};

var withLinks = function withLinks(editor) {
  var isInline = editor.isInline;

  var LINK_TYPE = 'link';

  /**
   * Set link type not to be an inline element
   */
  editor.isInline = function (element) {
    return element.type === LINK_TYPE ? true : isInline(element);
  };

  /**
   * If the editor loses focus upon pressing the `LinkButton`, you need to call
   * editor.rememberCurrentSelection() before the editor loses the focus
   */
  editor.insertLink = function (url) {
    if (editor.isNodeTypeActive(LINK_TYPE)) {
      editor.unwrapNode(LINK_TYPE);
    }
    // editor selection on link button click
    var wrapSelection = editor.selection || editor.rememberedSelection;
    editor.selection = wrapSelection ? wrapSelection : editor.selection;
    var node = {
      type: LINK_TYPE,
      url: url,
      children: editor.isCollapsed() ? [{ text: url }] : []
    };
    editor.wrapNode(node, wrapSelection);
  };

  return editor;
};

/**
 *
 * @param {Object} editor editor for the library
 * Plugin to tag/mention users to the editor
 */
var withMention = function withMention(editor) {
  var isInline = editor.isInline,
      isVoid = editor.isVoid;

  var MENTION_TYPE = 'mention';

  /**
   * Overwrite to indicate `mention` nodes are inline
   */
  editor.isInline = function (element) {
    return element.type === MENTION_TYPE ? true : isInline(element);
  };

  /**
   * Overwrite to indicate `mention` nodes are void
   */
  editor.isVoid = function (element) {
    return element.type === MENTION_TYPE ? true : isVoid(element);
  };

  /**
   *
   * @param {*} text Label text to display
   * @param {*} text Label text to display
   * Inserts the mention within the body of the editor
   */
  editor.insertMention = function (identifier, text) {
    var mention = {
      type: 'mention',
      identifier: identifier,
      children: [{ text: text + ' ' }]
    };
    slate.Transforms.insertNodes(editor, mention);
    // Transforms.move(editor)
    slateReact.ReactEditor.focus(editor);
    slate.Transforms.move(editor);
  };

  /**
   *
   * @param {Object} target Target range
   * @param {String|Number} identifier Unique identifier for the mention (eg. id, email , etc..)
   * @param {*} text Label text to display
   * Select and insert a new mention within the body of the editor
   */
  editor.selectAndInsert = function (target, identifier, text) {
    slate.Transforms.select(editor, target);
    editor.insertMention(identifier, text);
  };

  return editor;
};

var useStyles = styles.makeStyles(function (theme) {
  return {
    root: {
      borderRadius: theme.shape.borderRadius,
      border: '1px solid',
      borderColor: theme.palette.grey[400],
      '&:hover': {
        borderColor: theme.palette.text.primary
      }
    },
    focused: {
      borderColor: theme.palette.primary.main,
      '&:hover': {
        borderColor: theme.palette.primary.main
      }
    }
  };
});

/**
 * Rich Slate
 *
 * It is the provider of the useSlate hook.
 *
 *
 */
function MaterialSlate(_ref) {
  var value = _ref.value,
      editor = _ref.editor,
      _onChange = _ref.onChange,
      children = _ref.children,
      className = _ref.className,
      focusClassName = _ref.focusClassName;

  var classes = useStyles();

  var _useState = React.useState(false),
      _useState2 = slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  return React__default.createElement(
    Box,
    {
      onBlur: function onBlur() {
        return setIsFocused(false);
      },
      onFocus: function onFocus() {
        return setIsFocused(true);
      },
      className: classes.root + ' ' + (isFocused && (focusClassName ? focusClassName : classes.focused)) + ' ' + className
    },
    React__default.createElement(
      slateReact.Slate,
      { value: value, editor: editor, onChange: function onChange(value) {
          return _onChange(value);
        } },
      children
    )
  );
}

MaterialSlate.propTypes = {
  /** editor created using createRichEditor() */
  editor: PropTypes.object.isRequired,
  /** content to display in the editor*/
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Called every time there is a change on the value */
  onChange: PropTypes.func,
  /** class to override and style the slate  */
  className: PropTypes.string,
  /** className to apply when the editor has focus */
  focusClassName: PropTypes.string
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey];
  }

  var array = hotkey.map(function (string) {
    return parseHotkey(string, options);
  });
  var check = function check(e) {
    return array.some(function (object) {
      return compareHotkey(object, e);
    });
  };
  var ret = event == null ? check : check(event);
  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var optional = value.endsWith('?') && value.length > 1;

      if (optional) {
        value = value.slice(0, -1);
      }

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length === 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = optional ? null : true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) {
      continue;
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase();
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual == null && expected === false) {
      continue;
    }

    if (actual !== expected) {
      return false;
    }
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;
});

var isHotkey = unwrapExports(lib);
var lib_1 = lib.isHotkey;
var lib_2 = lib.isCodeHotkey;
var lib_3 = lib.isKeyHotkey;
var lib_4 = lib.parseHotkey;
var lib_5 = lib.compareHotkey;
var lib_6 = lib.toKeyCode;
var lib_7 = lib.toKeyName;

function defaultRenderElement(_ref) {
  var element = _ref.element,
      children = _ref.children,
      attributes = _ref.attributes,
      rest = objectWithoutProperties(_ref, ['element', 'children', 'attributes']);

  switch (element.type) {
    case 'block-quote':
      return React__default.createElement(
        'blockquote',
        attributes,
        children
      );
    case 'bulleted-list':
      return React__default.createElement(
        'ul',
        attributes,
        children
      );
    case 'heading-one':
      return React__default.createElement(
        'h1',
        attributes,
        children
      );
    case 'heading-two':
      return React__default.createElement(
        'h2',
        attributes,
        children
      );
    case 'list-item':
      return React__default.createElement(
        'li',
        attributes,
        children
      );
    case 'numbered-list':
      return React__default.createElement(
        'ol',
        attributes,
        children
      );
    case 'link':
      return React__default.createElement(
        'a',
        _extends({}, attributes, { href: element.url }),
        children
      );
    default:
      return React__default.createElement(
        'p',
        attributes,
        children
      );
  }
}

/**
 * Default renderer of leafs. 
 * 
 * Handles the following type of leafs `bold` (strong), `code` (code), `italic` (em), `strikethrough` (del), `underlined`(u).
 * 
 * @param {Object} props 
 */

function defaultRenderLeaf(_ref) {
  var leaf = _ref.leaf,
      attributes = _ref.attributes,
      children = _ref.children,
      text = _ref.text;

  if (leaf.bold) {
    children = React__default.createElement(
      'strong',
      null,
      children
    );
  }
  if (leaf.code) {
    children = React__default.createElement(
      'code',
      null,
      children
    );
  }
  if (leaf.italic) {
    children = React__default.createElement(
      'em',
      null,
      children
    );
  }
  if (leaf.strikethrough) {
    children = React__default.createElement(
      'del',
      null,
      children
    );
  }
  if (leaf.underlined) {
    children = React__default.createElement(
      'u',
      null,
      children
    );
  }
  return React__default.createElement(
    'span',
    attributes,
    children
  );
}

var defaultHotkeys = {
  'mod+b': {
    type: 'mark',
    value: 'bold'
  },
  'mod+i': {
    type: 'mark',
    value: 'italic'
  },
  'mod+u': {
    type: 'mark',
    value: 'underlined'
  },
  'mod+`': {
    type: 'mark',
    value: 'code'
  },
  'shift+enter': {
    type: 'newline',
    value: ''
  }
};

var useStyles$1 = styles.makeStyles(function (theme) {
  return {
    editable: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontFamily: theme.typography.fontFamily
    }
  };
});

/**
 * Wrapper of Slate Editable
 *
 */
function MaterialEditable(_ref) {
  var renderElement = _ref.renderElement,
      renderLeaf = _ref.renderLeaf,
      placeholder = _ref.placeholder,
      hotkeys = _ref.hotkeys,
      onHotkey = _ref.onHotkey,
      children = _ref.children,
      className = _ref.className,
      props = objectWithoutProperties(_ref, ['renderElement', 'renderLeaf', 'placeholder', 'hotkeys', 'onHotkey', 'children', 'className']);

  var editor = slateReact.useSlate();
  var classes = useStyles$1();

  // Define a rendering function based on the element passed to `props`.
  // Props is deconstructed in the {element, attributes, children, rest (any other prop)
  // We use `useCallback` here to memoize the function for subsequent renders.
  var handleRenderElement = React.useCallback(function (props) {
    return renderElement ? renderElement(props) : defaultRenderElement(props);
  }, []);

  var handleRenderLeaf = React.useCallback(function (props) {
    return renderLeaf ? renderLeaf(props) : defaultRenderLeaf(props);
  }, []);

  var handleOnKeyDown = function handleOnKeyDown(event) {
    for (var pressedKeys in hotkeys) {
      if (isHotkey(pressedKeys, event)) {
        var hotkey = hotkeys[pressedKeys];
        //console.log(hotkey)
        event.preventDefault();
        if (hotkey.type === 'mark') {
          editor.toggleMark(hotkey.value);
        }
        if (hotkey.type === 'block') {
          editor.toggleBlock(hotkey.value);
        }
        if (hotkey.type === 'newline') {
          editor.insertText('\n');
          //The following line updates the cursor
          slate.Transforms.move(editor, { distance: 0, unit: 'offset' });
        }
        return onHotkey && onHotkey({ event: event, editor: editor, hotkey: hotkey, pressedKeys: pressedKeys, hotkeys: hotkeys });
      }
    }
  };
  return React__default.createElement(
    slateReact.Editable,
    _extends({
      renderElement: handleRenderElement,
      renderLeaf: handleRenderLeaf,
      onKeyDown: function onKeyDown(event) {
        return handleOnKeyDown(event);
      },
      placeholder: placeholder,
      className: classes.editable + ' ' + className
    }, props),
    children
  );
}

// Specifies the default values for props:
MaterialEditable.defaultProps = {
  placeholder: 'Type some text...',
  hotkeys: defaultHotkeys

  // TODO add info about arguments in functions

};MaterialEditable.propTypes = {
  /** To style and override the existing class  */
  className: PropTypes.string,
  /** Called when an element needs to be rendered */
  renderElement: PropTypes.func,
  /** Called when a leaf needs to be rendered */
  renderLeaf: PropTypes.func,
  /** Text to display when there are no contents on the editor. Default" "Type some text..." */
  placeholder: PropTypes.string,
  /**
   * Additional hotkeys to be added other than default. Object of the form `{'mod+k': {type: 'mark', value: 'italic'}
   * defaultHotkeys can be disallowed by passing hotkeys as null
   */
  hotkeys: PropTypes.object,
  /**
   * Event tht will be triggered in case a hotkey is detected
   * It has one single argument that can be deconstructed in `{event, editor, hotkey, pressedKeys, hotkeys}`
   */
  onHotKey: PropTypes.func
};

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var createSvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = interopRequireDefault(_extends_1);

var _react = interopRequireDefault(React__default);

var _SvgIcon = interopRequireDefault(SvgIcon);

function createSvgIcon(path, displayName) {
  var Component = _react.default.memo(_react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
      ref: ref
    }, props), path);
  }));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = _SvgIcon.default.muiName;
  return Component;
}
});

unwrapExports(createSvgIcon_1);

var CropSquareOutlined = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"
}), 'CropSquareOutlined');

exports.default = _default;
});

var CropSquareOutlined$1 = unwrapExports(CropSquareOutlined);

/**
 * ToolbarButton is the base button for any button on the toolbars.
 * It requires the `type` of action to perform and the format that will be added.
 *
 * It displays a tooltip text on hover. If tooltip text is not passed as a prop it will use the capitalized text of the format
 */
var ToolbarButton = React__default.forwardRef(function (_ref, ref) {
  var tooltip = _ref.tooltip,
      placement = _ref.placement,
      icon = _ref.icon,
      type = _ref.type,
      disabled = _ref.disabled,
      disableOnSelection = _ref.disableOnSelection,
      disableOnCollapse = _ref.disableOnCollapse,
      format = _ref.format,
      onMouseDown = _ref.onMouseDown,
      isActive = _ref.isActive,
      rest = objectWithoutProperties(_ref, ['tooltip', 'placement', 'icon', 'type', 'disabled', 'disableOnSelection', 'disableOnCollapse', 'format', 'onMouseDown', 'isActive']);

  var editor = slateReact.useSlate();

  /**
   * If no tooltip prop is passed it generates a default based on the format string.
   * Converts - into spaces and uppercases the first letter of the first word.
   */
  var defaultTooltip = function defaultTooltip() {
    return (format.charAt(0).toUpperCase() + format.substring(1)).replace('-', ' ');
  };

  /**
   * Toggles mark| block and forwards the onMouseDown event
   */
  var handleOnMouseDown = function handleOnMouseDown(event) {
    event.preventDefault();
    switch (type) {
      case 'mark':
        editor.toggleMark(format);
        break;
      case 'block':
        editor.toggleBlock(format);
    }
    onMouseDown && onMouseDown({ editor: editor, format: format, type: type, event: event });
  };

  var checkIsActive = function checkIsActive() {
    if (isActive) {
      return isActive();
    }

    switch (type) {
      case 'mark':
        return editor.isMarkActive(format);
      case 'block':
        return editor.isBlockActive(format);
      case 'link':
        return editor.isNodeTypeActive(format);
    }
    return;
  };

  /**
   * Conditionally disables the button
   */
  var isDisabled = function isDisabled() {
    var disabled = false;
    disabled = disableOnSelection ? editor.isSelectionExpanded() : false;
    disabled = disableOnCollapse ? editor.isSelectionCollapsed() : disabled;
    return disabled;
  };

  return disabled || isDisabled() ? React__default.createElement(
    IconButton,
    _extends({
      'aria-label': tooltip ? tooltip : defaultTooltip(),
      ref: ref,
      color: checkIsActive() ? 'secondary' : 'default',
      onMouseDown: function onMouseDown(event) {
        return handleOnMouseDown(event);
      },
      disabled: disabled || isDisabled()
    }, rest),
    icon
  ) : React__default.createElement(
    Tooltip,
    {
      title: tooltip ? tooltip : defaultTooltip(),
      placement: placement
    },
    React__default.createElement(
      IconButton,
      _extends({
        'aria-label': tooltip ? tooltip : defaultTooltip(),
        ref: ref,
        color: checkIsActive() ? 'secondary' : 'default',
        onMouseDown: function onMouseDown(event) {
          return handleOnMouseDown(event);
        },
        disabled: disabled || isDisabled()
      }, rest),
      icon
    )
  );
});

ToolbarButton.defaultProps = {
  placement: 'top',
  icon: React__default.createElement(CropSquareOutlined$1, null),
  disableOnCollapse: false,
  disableOnSelection: false

  // PropTypes
};ToolbarButton.propTypes = {
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
   * If you don't want to add a mark or a block do not set the prop or use whatever string.
   * You can perform the action the button triggers using onMouseDown().
   */
  type: PropTypes.string,

  /**
   *
   * The string that identifies the format of the block or mark to be added. For example: `bold`, `header1`...
   */
  format: PropTypes.string.isRequired,

  /**
   *
   * When a button is active it means the button is highlighted. For example, if in current position of the cursor,
   * the text is bold, the bold button should be active.
   *
   * isActive is a function that returns true/false to indicate the status of the mark/block.
   * Set this function if you need to handle anything other than standard mark or blocks.
   */
  isActive: PropTypes.func,

  /**
   * Unconditionally disables the button
   *
   * Disable a button means that the button cannot be clicked (note it is not the opposite of isActive)
   */
  disabled: PropTypes.bool,
  /**
   * If true, disables the button if there is a text selected on the editor.
   *
   * Disable a button means that the button cannot be clicked.
   *
   * Use either disableOnSelection or disableOnCollapse, but not both.
   */
  disableOnSelection: PropTypes.bool,

  /**
   * If true, disables the button when  there is no text selected or the editor has no focus.
   *
   * Disable a button means that button cannot be clicked.
   *
   * Use either disableOnSelection or disableOnCollapse, but not both.
   */
  disableOnCollapse: PropTypes.bool,

  /**
   * Instance a component. The icon that will be displayed. Typically an icon from @material-ui/icons
   */
  icon: PropTypes.object,

  /**
   * On mouse down event is passed up to the parent with props that can be deconstructed in {editor, event, mark/block}
   */
  onMouseDown: PropTypes.func
};

var FormatBold = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}), 'FormatBold');

exports.default = _default;
});

var FormatBold$1 = unwrapExports(FormatBold);

/**
 * Toolbar button for bold text mark
 * 
 * @see ToolbarButton
 */

var BoldButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(FormatBold$1, null), type: 'mark', format: 'bold', ref: ref }, props));
});

var FormatItalicOutlined = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}), 'FormatItalicOutlined');

exports.default = _default;
});

var FormatItalicOutlined$1 = unwrapExports(FormatItalicOutlined);

/**
 * Toolbar button for italic text mark
 * 
 * @see ToolbarButton
 */

var ItalicButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(FormatItalicOutlined$1, null), type: 'mark', format: 'italic', ref: ref }, props));
});

var FormatUnderlined = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
}), 'FormatUnderlined');

exports.default = _default;
});

var FormatUnderlined$1 = unwrapExports(FormatUnderlined);

/**
 * Toolbar button for underlined text mark
 * 
 * @see ToolbarButton
 */
var UnderlinedButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(FormatUnderlined$1, null), type: 'mark', format: 'underlined', ref: ref }, props));
});

var StrikethroughS = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.73 1.46 3.24h-3.01c0-.31-.05-.59-.15-.85-.29-.86-1.2-1.28-2.25-1.28-1.86 0-2.34 1.02-2.34 1.7 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.21-.34-.54-.89-.54-1.92zM21 12v-2H3v2h9.62c1.15.45 1.96.75 1.96 1.97 0 1-.81 1.67-2.28 1.67-1.54 0-2.93-.54-2.93-2.51H6.4c0 .55.08 1.13.24 1.58.81 2.29 3.29 3.3 5.67 3.3 2.27 0 5.3-.89 5.3-4.05 0-.3-.01-1.16-.48-1.94H21V12z"
}), 'StrikethroughS');

exports.default = _default;
});

var StrikethroughSIcon = unwrapExports(StrikethroughS);

/**
 * Toolbar button for strike through text mark
 * 
 * @see ToolbarButton
 */

var StrikethroughButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(StrikethroughSIcon, null), type: 'mark', format: 'strikethrough', ref: ref }, props));
});

var Code = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
}), 'Code');

exports.default = _default;
});

var CodeIcon = unwrapExports(Code);

/**
 * Toolbar button for adding code mono-spaced text mark
 * 
 * @see ToolbarButton
 */

var CodeButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(CodeIcon, null), type: 'mark', format: 'code', ref: ref }, props));
});

var FormatListBulleted = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
}), 'FormatListBulleted');

exports.default = _default;
});

var FormatListBulleted$1 = unwrapExports(FormatListBulleted);

/**
 * Toolbar button for underlined text mark
 * 
 * @see ToolbarButton
 * 
 */
var BulletedListButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(FormatListBulleted$1, null), type: 'block', format: 'bulleted-list', ref: ref }, props));
});

var FormatListNumbered = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
}), 'FormatListNumbered');

exports.default = _default;
});

var FormatListNumbered$1 = unwrapExports(FormatListNumbered);

/**
 * Toolbar button for numbered list block
 * 
 * @see ToolbarButton
 */

var NumberedListButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({ icon: React__default.createElement(FormatListNumbered$1, null), type: 'block', format: 'numbered-list', ref: ref }, props));
});

var useStyles$2 = styles.makeStyles(function (theme) {
  return {
    toolbar: {
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(1 / 4)
    }
  };
});

/**
 * Toolbar that appears on the top of the editor.
 * 
 * It accepts any content as children. If no children are set it displays by default the following buttons:
 * Bold, italic, underline, strike through, code, bulleted list and numbered list
 */
function Toolbar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = objectWithoutProperties(_ref, ['children', 'className']);


  var classes = useStyles$2();
  return React__default.createElement(
    core.Box,
    _extends({ className: classes.toolbar, borderRadius: 'borderRadius' }, props),
    !children && React__default.createElement(
      React__default.Fragment,
      null,
      React__default.createElement(BoldButton, null),
      React__default.createElement(ItalicButton, null),
      React__default.createElement(UnderlinedButton, null),
      React__default.createElement(StrikethroughButton, null),
      React__default.createElement(CodeButton, null),
      React__default.createElement(BulletedListButton, null),
      React__default.createElement(NumberedListButton, null)
    ),
    children && React__default.createElement(
      React__default.Fragment,
      null,
      children
    )
  );
}

var Portal = function Portal(_ref) {
  var children = _ref.children;

  return ReactDOM.createPortal(children, document.body);
};

var useStyles$3 = styles.makeStyles(function (theme) {
  return {
    hoveringToolbar: {
      position: 'absolute',
      padding: theme.spacing(1 / 4),
      zIndex: 1,
      top: "-10000px",
      left: "-10000px",
      opacity: 0,
      backgroundColor: theme.palette.grey[200],
      transition: "opacity 0.75s"
    }
  };
});

/**
 * A hovering toolbar that is, a toolbar that appears over a selected text, and only when there is 
 * a selection. 
 * 
 * If no children are provided it displays the following buttons:
 * Bold, italic, underlined, strike through and code.
 * 
 * Children will typically be `ToolbarButton`. 
 */
function HoveringToolbar(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      props = objectWithoutProperties(_ref2, ['children', 'className']);


  var classes = useStyles$3();
  var ref = React.useRef();
  var editor = slateReact.useSlate();

  React.useEffect(function () {
    var el = ref.current;
    var selection = editor.selection;


    if (!el) {
      return;
    }

    if (!selection || !slateReact.ReactEditor.isFocused(editor) || slate.Range.isCollapsed(selection) || slate.Editor.string(editor, selection) === '') {
      el.removeAttribute('style');
      return;
    }

    var domSelection = window.getSelection();
    var domRange = domSelection.getRangeAt(0);
    var rect = domRange.getBoundingClientRect();
    el.style.opacity = 1;
    el.style.top = rect.top + window.pageYOffset - el.offsetHeight - 4 + 'px';
    el.style.left = rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2 + 'px';
  });

  return React__default.createElement(
    Portal,
    null,
    React__default.createElement(
      Box,
      _extends({
        borderRadius: 'borderRadius',
        ref: ref,
        className: className ? className : classes.hoveringToolbar
      }, props),
      !children && React__default.createElement(
        React__default.Fragment,
        null,
        React__default.createElement(BoldButton, null),
        React__default.createElement(ItalicButton, null),
        React__default.createElement(UnderlinedButton, null),
        React__default.createElement(StrikethroughButton, null),
        React__default.createElement(CodeButton, null)
      ),
      children && children
    )
  );
}

/**
 * Toolbar button separator.
 * 
 * Displays an horizontal line. Use it for separating groups of buttons. 
 * 
 */

function ButtonSeparator(_ref) {
  var borderColor = _ref.borderColor,
      other = objectWithoutProperties(_ref, ['borderColor']);

  var theme = styles.useTheme();
  return React__default.createElement(
    Box,
    _extends({ display: 'inline' }, other),
    React__default.createElement(Box, { borderLeft: 1, borderColor: borderColor ? borderColor : "grey.400", marginLeft: '2px', marginRight: '2px', display: 'inline' })
  );
}

/**
 * Simple dialog box with a text field and two buttons Cancel and Save.
 * Three props need to be set: 
 *  
 *  1. `onCancel` called when the cancel button is pressed ,
 *  2. `onSave` called when the save button is pressed 
 *  3. open, boolean that indicates if the dialog is displayed (true) or not (false)
 *
 */
function SimpleDialog(_ref) {
  var open = _ref.open,
      title = _ref.title,
      label = _ref.label,
      format = _ref.format,
      defaultValue = _ref.defaultValue,
      onCancel = _ref.onCancel,
      onSave = _ref.onSave,
      props = objectWithoutProperties(_ref, ['open', 'title', 'label', 'format', 'defaultValue', 'onCancel', 'onSave']);

  var _useState = React.useState(defaultValue),
      _useState2 = slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  //Calls `onCancel` prop and sets the default value


  var handleOnCancel = function handleOnCancel(format) {
    onCancel();
    setValue(defaultValue);
  };
  // Calls `onSave` prop and sets the default value
  var handleOnSave = function handleOnSave(event) {
    onSave({ format: format, value: value });
    setValue(defaultValue);
  };

  return React__default.createElement(
    Dialog,
    {
      open: open,
      onClose: handleOnCancel,
      'aria-labelledby': 'dialog-title',
      'aria-describedby': 'alert-dialog-description',
      fullWidth: true,
      maxWidth: props.maxWidth ? props.maxWidth : 'xs'
    },
    React__default.createElement(
      DialogTitle,
      { id: 'dialog-title' },
      title
    ),
    React__default.createElement(
      DialogContent,
      null,
      React__default.createElement(TextField, { fullWidth: true, multiline: true, autoFocus: true, defaultValue: defaultValue, label: label, variant: 'outlined',
        onChange: function onChange(event) {
          return setValue(event.target.value);
        }, required: true })
    ),
    React__default.createElement(
      DialogActions,
      null,
      React__default.createElement(
        Button,
        { onClick: function onClick() {
            return handleOnCancel();
          }, color: 'primary', variant: 'outlined' },
        'Cancel'
      ),
      React__default.createElement(
        Button,
        { onClick: function onClick(event) {
            return handleOnSave();
          }, color: 'primary', variant: 'contained' },
        'Save'
      )
    )
  );
}

SimpleDialog.propTypes = {
  /**
   * If it is true, it displays the dialog window.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Called whe the Cancel button is pressed 
   */
  onCancel: PropTypes.func.isRequired,
  /**
   * Called when the save button is pressed
   */
  onSave: PropTypes.func.isRequired,

  /**
   * Title of the dialog window
   */
  title: PropTypes.string,

  /**
   * Label of the textfield
   */
  label: PropTypes.string,

  /**
   * Format of the element to be added/edited. 
   * For example: bold, italic, comment, link, endnote
   * 
   * Just required if you use the same dialog for different type of nodes.
   */
  format: PropTypes.string,

  /**
   * Default value displayed on the textfield.
   */
  defaultValue: PropTypes.string
};

var AddCommentOutlined = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"
}), 'AddCommentOutlined');

exports.default = _default;
});

var AddCommentOutlinedIcon = unwrapExports(AddCommentOutlined);

/**
 * Toolbar button for adding comments.
 * 
 * The button is disabled on collapse.
 * 
 * @see ToolbarButton
 */

var AddCommentButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({
    icon: React__default.createElement(AddCommentOutlinedIcon, null),
    type: 'other',
    disableOnCollapse: true,
    tooltip: 'Add comment',
    format: 'comment',
    ref: ref
  }, props));
});

var CallToActionOutlined = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5z"
}), 'CallToActionOutlined');

exports.default = _default;
});

var CallToActionOutlinedIcon = unwrapExports(CallToActionOutlined);

/**
 * Toolbar button for adding endnotes
 * 
 * @see ToolbarButton
 */

var EndnoteButton = React__default.forwardRef(function (props, ref) {
  return React__default.createElement(ToolbarButton, _extends({
    icon: React__default.createElement(CallToActionOutlinedIcon, null),
    type: 'other',
    disableOnSelection: true,
    tooltip: 'Add endnote',
    format: 'endnote',
    ref: ref
  }, props));
});

var Link = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
}), 'Link');

exports.default = _default;
});

var LinkIcon = unwrapExports(Link);

/**
 * Toolbar button for adding links
 *
 * @see ToolbarButton
 */
function LinkButton(_ref) {
  var ref = _ref.ref,
      onMouseDown = _ref.onMouseDown,
      props = objectWithoutProperties(_ref, ['ref', 'onMouseDown']);

  var editor = slateReact.useSlate();
  typeof editor.insertLink !== 'function' && console.error('withLinks() is not initialized');
  // Handles the dialog that is opened upon clicking the Link Toolbar/HoveringBar button

  var _useState = React.useState(false),
      _useState2 = slicedToArray(_useState, 2),
      openLinkDialog = _useState2[0],
      setOpenLinkDialog = _useState2[1];

  // Handles custom buttons click


  var onLinkButtonDown = function onLinkButtonDown(_ref2) {
    var editor = _ref2.editor,
        props = objectWithoutProperties(_ref2, ['editor']);

    if (onMouseDown) {
      onMouseDown(_extends({ editor: editor }, props));
    } else {
      // When the dialog box is opened, the focus is lost as well as current selected text.
      // We need to save it for later on.
      editor.rememberCurrentSelection();
      setOpenLinkDialog(true);
    }
  };

  var handleDialogSave = function handleDialogSave(url) {
    setOpenLinkDialog(false);
    // Adds the link to the editor.
    // The link will wrap the selected text when `rememberCurrentSelection()` was called
    editor.insertLink(url);
  };

  return React__default.createElement(
    React__default.Fragment,
    null,
    React__default.createElement(ToolbarButton, _extends({
      icon: React__default.createElement(LinkIcon, null),
      type: 'link',
      tooltip: 'Add link',
      format: 'link',
      ref: ref,
      onMouseDown: function onMouseDown(event) {
        return onLinkButtonDown(event);
      }
    }, props)),
    !onMouseDown && React__default.createElement(SimpleDialog, {
      open: openLinkDialog,
      title: 'Add Link',
      label: 'Link',
      format: 'link',
      onCancel: function onCancel() {
        return setOpenLinkDialog(false);
      },
      onSave: function onSave(_ref3) {
        var value = _ref3.value;
        return handleDialogSave(value);
      }
    })
  );
}

LinkButton.propTypes = {
  /** onMouseDown :
   * disable the simple dialog and let's you add your own dialog
   * And gives the onMouseDown event
   */
  onMouseDown: PropTypes.func
};

var useStyles$4 = styles.makeStyles(function (theme) {
  return {
    root: {
      backgroundColor: '#e1f5fe',
      cursor: 'pointer'
    }
  };
});

/**
 * Renders a Comment.
 *  1. Adds blueish background to the text the comment wraps
 *  2. On hover displays the comment.
 *
 *  If `onClick` is passed, it is called if the text wrapped by the comment is clicked.
 *
 *  Expects the `element` object passed as prop to have `element.data.body` to display the comment text.
 *
 */
var CommentElement = function CommentElement(_ref) {
  var element = _ref.element,
      _onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children,
      attributes = _ref.attributes;

  var classes = useStyles$4();
  return React__default.createElement(
    Tooltip,
    { title: 'Comment: ' + element.data.body },
    React__default.createElement(
      'span',
      _extends({
        className: classes.root + ' ' + className
      }, attributes, {
        onClick: function onClick(event) {
          return _onClick && _onClick({ event: event, element: element });
        }
      }),
      children
    )
  );
};

var useStyles$5 = styles.makeStyles(function (theme) {
  return {
    root: {
      cursor: 'pointer'
    }
  };
});

/**
 * Displays a super index text with the index number of the endnote.
 * A tooltip with the content of the endnote is displayed if the user hovers the endnote.
 *
 * Expects the `element` prop to have `element.data.value` the text of the endnote (string) and
 * `element.data.index` the index number fo the endnote.
 *
 * If `onClick` prop is set it is called if user clicks the tex
 */
var EndnoteElement = function EndnoteElement(_ref) {
  var element = _ref.element,
      _onClick = _ref.onClick,
      attributes = _ref.attributes,
      children = _ref.children;

  var classes = useStyles$5();
  return React__default.createElement(
    Tooltip,
    { placement: 'top', title: '' + element.data.value },
    React__default.createElement(
      'sup',
      _extends({
        className: classes.root
      }, attributes, {
        onClick: function onClick(event) {
          return _onClick && _onClick({ event: event, element: element });
        }
      }),
      element.data.index || 'x',
      children
    )
  );
};

/**
 * @param {Object} props props for the mention element
 */
function MentionElement(props) {
  var attributes = props.attributes,
      children = props.children,
      element = props.element;

  switch (element.type) {
    case 'mention':
      return React__default.createElement(Mention, props);
    default:
      return React__default.createElement(
        'p',
        attributes,
        children
      );
  }
}

var Mention = function Mention(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      element = _ref.element;

  var selected = slateReact.useSelected();
  var focused = slateReact.useFocused();
  var textChild = element && element.children && element.children[0];
  return React__default.createElement(
    React.Fragment,
    null,
    textChild ? React__default.createElement(
      'span',
      _extends({}, attributes, {
        contentEditable: false,
        style: {
          padding: '3px 3px 2px',
          margin: '0 1px',
          verticalAlign: 'baseline',
          display: 'inline-block',
          borderRadius: '4px',
          backgroundColor: '#eee',
          fontSize: '0.9em',
          boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
        }
      }),
      '@',
      textChild.text,
      children
    ) : React__default.createElement(React.Fragment, null)
  );
};

var useStyles$6 = styles.makeStyles(function (theme) {
  return {
    text: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(1)
    },
    textError: {
      color: theme.palette.error.main
    }
  };
});

/**
 *
 * WordCounter for editor
 * It displays the number words, below the editor
 *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
 *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
 * Word counter will be displayed with error color, when wordLength exceeds maxWords
 */
function WordCounter(_ref) {
  var maxWords = _ref.maxWords;

  var classes = useStyles$6();
  var editor = slateReact.useSlate();
  var children = editor.children;
  // Words length

  var wordsLength = editor.getWordsLength(children);
  // Error based on words length limit
  var errorExceedWordsLimit = wordsLength > maxWords;

  return React__default.createElement(
    Typography,
    {
      variant: 'subtitle2',
      color: 'textSecondary',
      className: classes.text + ' ' + (errorExceedWordsLimit && classes.textError)
    },
    maxWords ? wordsLength + ' / ' + maxWords : wordsLength,
    ' words'
  );
}

WordCounter.propTypes = {
  /**
   * To display maximum words in counter
   *  - If maxWords = 200, wordsLength = 90 `Ex: 90/200 words` will display in the counter
   *  - When maxWords is undefined, wordsLength = 90 `Ex: 90 words` will be displayed
   */
  maxWords: PropTypes.number
};

var useStyles$7 = styles.makeStyles(function (theme) {
  return {
    text: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(1)
    },
    textError: {
      color: theme.palette.error.main
    }
  };
});

/**
 *
 * CharCounter for editor
 * It displays the number characters in the editor
 *  - If maxChars = 200, charLength = 90  `Ex: 90/200 characters` will display in the counter
 *  - When maxChars is undefined, charLength = 90 `Ex: 90 characters` will be displayed
 * Char counter will be displayed with error color, when CharLength exceeds maxChars
 */
function CharCounter(_ref) {
  var maxChars = _ref.maxChars;

  var classes = useStyles$7();
  var editor = slateReact.useSlate();
  var children = editor.children;
  // Char length

  var charLength = editor.getCharLength(children);
  // Error based on chars length limit
  var errorExceedCharsLimit = charLength > maxChars;

  return React__default.createElement(
    Typography,
    {
      variant: 'subtitle2',
      color: 'textSecondary',
      className: classes.text + ' ' + (errorExceedCharsLimit && classes.textError)
    },
    maxChars ? charLength + ' / ' + maxChars : charLength,
    ' characters'
  );
}

CharCounter.propTypes = {
  /**
   * To display maximum characters in counter
   * - If maxChars = 200, charLength = 90  `Ex: 90/200 characters` will display in the counter
   * - When maxChars is undefined, charLength = 90 `Ex: 90 characters` will be displayed
   */
  maxChars: PropTypes.number
};

/**
 * get the range of the tagged user
 * @param {Object} editor editor object
 * @param {Object} start start position point in the editor
 * @param {Number} maxDistance distance(words)in which the people picker will work with (separated by spaces)
 * @returns start range of the tagged user
 */
var getBeforeRangeOfTagging = function getBeforeRangeOfTagging(editor, start) {
  var maxDistance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

  var taggingBeforeRange = null;
  for (var i = 1; i <= maxDistance; i++) {
    var wordBefore = slate.Editor.before(editor, start, {
      unit: 'word',
      distance: i
    });
    var before = wordBefore && slate.Editor.before(editor, wordBefore);
    var beforeRange = before && slate.Editor.range(editor, before, start);
    var beforeText = beforeRange && slate.Editor.string(editor, beforeRange);
    // this is to avoid to overpass any tagged that is in the middle when typing
    // (eg. @dey [other user tagged] yner - tagged users are not considered as words, but as space )
    var spacesAndDistanceAreCorrect = beforeText && i === beforeText.split(' ').filter(function (t) {
      return t;
    }).length;
    if (beforeText && beforeText.startsWith('@') && spacesAndDistanceAreCorrect) {
      taggingBeforeRange = beforeRange;
      break;
    }
  }
  return taggingBeforeRange;
};

exports.AddCommentButton = AddCommentButton;
exports.BoldButton = BoldButton;
exports.BulletedListButton = BulletedListButton;
exports.ButtonSeparator = ButtonSeparator;
exports.CharCounter = CharCounter;
exports.CodeButton = CodeButton;
exports.CommentElement = CommentElement;
exports.EndnoteButton = EndnoteButton;
exports.EndnoteElement = EndnoteElement;
exports.HoveringToolbar = HoveringToolbar;
exports.ItalicButton = ItalicButton;
exports.LinkButton = LinkButton;
exports.MaterialEditable = MaterialEditable;
exports.MaterialEditor = MaterialEditor;
exports.MaterialSlate = MaterialSlate;
exports.MentionElement = MentionElement;
exports.NumberedListButton = NumberedListButton;
exports.SimpleDialog = SimpleDialog;
exports.StrikethroughButton = StrikethroughButton;
exports.Toolbar = Toolbar;
exports.ToolbarButton = ToolbarButton;
exports.UnderlinedButton = UnderlinedButton;
exports.WordCounter = WordCounter;
exports.createMaterialEditor = createMaterialEditor;
exports.defaultHotkeys = defaultHotkeys;
exports.defaultRenderElement = defaultRenderElement;
exports.defaultRenderLeaf = defaultRenderLeaf;
exports.getBeforeRangeOfTagging = getBeforeRangeOfTagging;
exports.withComments = withComments;
exports.withCounter = withCounter;
exports.withEndnotes = withEndnotes;
exports.withLinks = withLinks;
exports.withMention = withMention;
//# sourceMappingURL=index.js.map
