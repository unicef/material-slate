(this["webpackJsonp@unicef/material-slate-example"]=this["webpackJsonp@unicef/material-slate-example"]||[]).push([[0],{10:function(e,t,n){"use strict";function r(e){return e&&"object"===typeof e&&"default"in e?e.default:e}Object.defineProperty(t,"__esModule",{value:!0});var a=n(7),o=n(261),l=n(262),i=n(0),c=r(i),u=r(n(253)),d=r(n(54)),s=n(81),m=n(220),f=r(n(50)),p=r(n(96)),h=r(n(55)),v=r(n(15)),b=r(n(80)),E=r(n(97)),y=r(n(98)),g=r(n(99)),k=r(n(100)),w=r(n(101)),C=r(n(26)),O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},S=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},x=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(c){a=!0,o=c}finally{try{!r&&i.return&&i.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},j=O({},a.Editor),M=function(e){return e.isSelectionExpanded=function(){return!!e.selection&&a.Range.isExpanded(e.selection)},e.isSelectionCollapsed=function(){return!e.isSelectionExpanded()},e.isFocused=function(){return o.ReactEditor.isFocused(e)},e.unwrapNode=function(t){a.Transforms.unwrapNodes(e,{match:function(e){return e.type===t}})},e.isNodeTypeActive=function(t){var n=j.nodes(e,{match:function(e){return e.type===t}});return!!x(n,1)[0]},e.rememberedSelection={},e.rememberCurrentSelection=function(){e.rememberedSelection=e.selection},e.isCollapsed=function(){var t=e.selection;return t&&a.Range.isCollapsed(t)},e.wrapNode=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e.selection=n||e.selection,e.isNodeTypeActive(t.type)&&e.unwrapNode(t.type),e.isCollapsed()?a.Transforms.insertNodes(e,t):(a.Transforms.wrapNodes(e,t,{split:!0}),a.Transforms.collapse(e,{edge:"end"}))},e.syncExternalNodes=function(t,n){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=n.map((function(e){return e.id}));r?e.unwrapNotInList(t,o):e.removeNotInList(t,o);var l={};n.forEach((function(e){return l[e.id]=e}));var i=e.findNodesByType(t);i.map((function(t){a.Transforms.setNodes(e,{data:l[t.id]},{match:function(e){return e.id==t.id},at:[]})}))},e.removeNotInList=function(t,n){a.Transforms.removeNodes(e,{match:function(e){return e.type===t&&!n.includes(e.id)},at:[]})},e.unwrapNotInList=function(t,n){a.Transforms.unwrapNodes(e,{match:function(e){return e.type===t&&!n.includes(e.id)},at:[]})},e.findNodesByType=function(t){var n=j.nodes(e,{match:function(e){return e.type===t},at:[]});return Array.from(n).map((function(e){return e[0]}))},e.serialize=function(e){return e.map((function(e){return a.Node.string(e)})).join("\n")},e.syncExternalNodesWithTemporaryId=function(t,n){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=n.map((function(e){return e.id})),l={};n.forEach((function(e){return l[e.id]=e}));var i=e.findNodesByType(t);i.map((function(n){var i=Object.keys(l).find((function(e){return l[e].temporaryId===n.id})),c=l[i];l[n.id]&&!c?a.Transforms.setNodes(e,{data:l[n.id]},{match:function(e){return e.id==n.id},at:[0]}):i&&c?a.Transforms.setNodes(e,{id:c.id,data:c},{match:function(e){return e.id==c.temporaryId},at:[]}):r?e.unwrapNotInList(t,o):e.removeNotInList(t,o)}))},e.getSelectedText=function(){return j.string(e,e.rememberedSelection)},e},N=function(e){return e.isMarkActive=function(t){var n=j.marks(e);return!!n&&!0===n[t]},e.toggleMark=function(t){e.isMarkActive(t)?j.removeMark(e,t):j.addMark(e,t,!0)},e},T=function(e){return e.LIST_TYPES=["numbered-list","bulleted-list"],e.isBlockActive=function(t){var n=j.nodes(e,{match:function(e){return e.type===t}});return!!x(n,1)[0]},e.toggleBlock=function(t){var n=e.isBlockActive(t),r=e.LIST_TYPES.includes(t);if(a.Transforms.unwrapNodes(e,{match:function(t){return e.LIST_TYPES.includes(t.type)},split:!0}),a.Transforms.setNodes(e,{type:n?"paragraph":r?"list-item":t}),!n&&r){var o={type:t,children:[]};a.Transforms.wrapNodes(e,o)}},e};var B=s.makeStyles((function(e){return{root:{borderRadius:e.shape.borderRadius,border:"1px solid",borderColor:e.palette.grey[400],"&:hover":{borderColor:e.palette.text.primary}},focused:{borderColor:e.palette.primary.main,"&:hover":{borderColor:e.palette.primary.main}}}}));function L(e){var t=e.value,n=e.editor,r=e.onChange,a=e.children,l=e.className,u=e.focusClassName,s=B(),m=i.useState(!1),f=x(m,2),p=f[0],h=f[1];return c.createElement(d,{onBlur:function(){return h(!1)},onFocus:function(){return h(!0)},className:s.root+" "+(p&&(u||s.focused))+" "+l},c.createElement(o.Slate,{value:t,editor:n,onChange:function(e){return r(e)}},a))}function H(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function R(e,t){return e(t={exports:{}},t.exports),t.exports}L.propTypes={editor:u.object.isRequired,value:u.arrayOf(u.object).isRequired,onChange:u.func,className:u.string,focusClassName:u.string};var A=R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});for(var n="undefined"!=typeof window&&/Mac|iPod|iPhone|iPad/.test(window.navigator.platform),r={alt:"altKey",control:"ctrlKey",meta:"metaKey",shift:"shiftKey"},a={add:"+",break:"pause",cmd:"meta",command:"meta",ctl:"control",ctrl:"control",del:"delete",down:"arrowdown",esc:"escape",ins:"insert",left:"arrowleft",mod:n?"meta":"control",opt:"alt",option:"alt",return:"enter",right:"arrowright",space:" ",spacebar:" ",up:"arrowup",win:"meta",windows:"meta"},o={backspace:8,tab:9,enter:13,shift:16,control:17,alt:18,pause:19,capslock:20,escape:27," ":32,pageup:33,pagedown:34,end:35,home:36,arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,insert:45,delete:46,meta:91,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},l=1;l<20;l++)o["f"+l]=111+l;function i(e,t,n){t&&!("byKey"in t)&&(n=t,t=null),Array.isArray(e)||(e=[e]);var r=e.map((function(e){return c(e,t)})),a=function(e){return r.some((function(t){return u(t,e)}))};return null==n?a:a(n)}function c(e,t){var n=t&&t.byKey,a={},o=(e=e.replace("++","+add")).split("+"),l=o.length;for(var i in r)a[r[i]]=!1;var c=!0,u=!1,m=void 0;try{for(var f,p=o[Symbol.iterator]();!(c=(f=p.next()).done);c=!0){var h=f.value,v=h.endsWith("?")&&h.length>1;v&&(h=h.slice(0,-1));var b=s(h),E=r[b];1!==l&&E||(n?a.key=b:a.which=d(h)),E&&(a[E]=!v||null)}}catch(y){u=!0,m=y}finally{try{!c&&p.return&&p.return()}finally{if(u)throw m}}return a}function u(e,t){for(var n in e){var r=e[n],a=void 0;if(null!=r&&((null!=(a="key"===n&&null!=t.key?t.key.toLowerCase():"which"===n?91===r&&93===t.which?91:t.which:t[n])||!1!==r)&&a!==r))return!1}return!0}function d(e){return e=s(e),o[e]||e.toUpperCase().charCodeAt(0)}function s(e){return e=e.toLowerCase(),e=a[e]||e}t.default=i,t.isHotkey=i,t.isCodeHotkey=function(e,t){return i(e,t)},t.isKeyHotkey=function(e,t){return i(e,{byKey:!0},t)},t.parseHotkey=c,t.compareHotkey=u,t.toKeyCode=d,t.toKeyName=s})),z=H(A);A.isHotkey,A.isCodeHotkey,A.isKeyHotkey,A.parseHotkey,A.compareHotkey,A.toKeyCode,A.toKeyName;function _(e){var t=e.element,n=e.children,r=e.attributes;S(e,["element","children","attributes"]);switch(t.type){case"block-quote":return c.createElement("blockquote",r,n);case"bulleted-list":return c.createElement("ul",r,n);case"heading-one":return c.createElement("h1",r,n);case"heading-two":return c.createElement("h2",r,n);case"list-item":return c.createElement("li",r,n);case"numbered-list":return c.createElement("ol",r,n);case"link":return c.createElement("a",O({},r,{href:t.url}),n);default:return c.createElement("p",r,n)}}function V(e){var t=e.leaf,n=e.attributes,r=e.children;e.text;return t.bold&&(r=c.createElement("strong",null,r)),t.code&&(r=c.createElement("code",null,r)),t.italic&&(r=c.createElement("em",null,r)),t.strikethrough&&(r=c.createElement("del",null,r)),t.underlined&&(r=c.createElement("u",null,r)),c.createElement("span",n,r)}var I={"mod+b":{type:"mark",value:"bold"},"mod+i":{type:"mark",value:"italic"},"mod+u":{type:"mark",value:"underlined"},"mod+`":{type:"mark",value:"code"},"shift+enter":{type:"newline",value:""}},P=s.makeStyles((function(e){return{editable:{paddingLeft:e.spacing(1),paddingRight:e.spacing(1),paddingBottom:e.spacing(1),fontFamily:e.typography.fontFamily}}}));function D(e){var t=e.renderElement,n=e.renderLeaf,r=e.placeholder,l=e.hotkeys,u=e.onHotkey,d=e.children,s=e.className,m=S(e,["renderElement","renderLeaf","placeholder","hotkeys","onHotkey","children","className"]),f=o.useSlate(),p=P(),h=i.useCallback((function(e){return t?t(e):_(e)}),[]),v=i.useCallback((function(e){return n?n(e):V(e)}),[]);return c.createElement(o.Editable,O({renderElement:h,renderLeaf:v,onKeyDown:function(e){return function(e){for(var t in l)if(z(t,e)){var n=l[t];return e.preventDefault(),"mark"===n.type&&f.toggleMark(n.value),"block"===n.type&&f.toggleBlock(n.value),"newline"===n.type&&(f.insertText("\n"),a.Transforms.move(f,{distance:0,unit:"offset"})),u&&u({event:e,editor:f,hotkey:n,pressedKeys:t,hotkeys:l})}}(e)},placeholder:r,className:p.editable+" "+s},m),d)}D.defaultProps={placeholder:"Type some text...",hotkeys:I},D.propTypes={className:u.string,renderElement:u.func,renderLeaf:u.func,placeholder:u.string,hotkeys:u.object,onHotKey:u.func};var F=R((function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}}}));H(F);var W=R((function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.apply(this,arguments)}e.exports=t})),K=R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var o=r.default.memo(r.default.forwardRef((function(t,o){return r.default.createElement(a.default,(0,n.default)({ref:o},t),e)})));0;return o.muiName=a.default.muiName,o};var n=F(W),r=F(c),a=F(h)}));H(K);var q=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"}),"CropSquareOutlined");t.default=r}))),U=c.forwardRef((function(e,t){var n=e.tooltip,r=e.placement,a=e.icon,l=e.type,i=e.disabled,u=e.disableOnSelection,d=e.disableOnCollapse,s=e.format,m=e.onMouseDown,h=e.isActive,v=S(e,["tooltip","placement","icon","type","disabled","disableOnSelection","disableOnCollapse","format","onMouseDown","isActive"]),b=o.useSlate(),E=function(){return(s.charAt(0).toUpperCase()+s.substring(1)).replace("-"," ")},y=function(e){switch(e.preventDefault(),l){case"mark":b.toggleMark(s);break;case"block":b.toggleBlock(s)}m&&m({editor:b,format:s,type:l,event:e})},g=function(){if(h)return h();switch(l){case"mark":return b.isMarkActive(s);case"block":return b.isBlockActive(s);case"link":return b.isNodeTypeActive(s)}},k=function(){var e=!1;return e=!!u&&b.isSelectionExpanded(),e=d?b.isSelectionCollapsed():e};return i||k()?c.createElement(f,O({"aria-label":n||E(),ref:t,color:g()?"secondary":"default",onMouseDown:function(e){return y(e)},disabled:i||k()},v),a):c.createElement(p,{title:n||E(),placement:r},c.createElement(f,O({"aria-label":n||E(),ref:t,color:g()?"secondary":"default",onMouseDown:function(e){return y(e)},disabled:i||k()},v),a))}));U.defaultProps={placement:"top",icon:c.createElement(q,null),disableOnCollapse:!1,disableOnSelection:!1},U.propTypes={tooltip:u.string,placement:u.string,type:u.string,format:u.string.isRequired,isActive:u.func,disabled:u.bool,disableOnSelection:u.bool,disableOnCollapse:u.bool,icon:u.object,onMouseDown:u.func};var Y=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"}),"FormatBold");t.default=r}))),J=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(Y,null),type:"mark",format:"bold",ref:t},e))})),G=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"}),"FormatItalicOutlined");t.default=r}))),X=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(G,null),type:"mark",format:"italic",ref:t},e))})),$=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"}),"FormatUnderlined");t.default=r}))),Q=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement($,null),type:"mark",format:"underlined",ref:t},e))})),Z=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.73 1.46 3.24h-3.01c0-.31-.05-.59-.15-.85-.29-.86-1.2-1.28-2.25-1.28-1.86 0-2.34 1.02-2.34 1.7 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.21-.34-.54-.89-.54-1.92zM21 12v-2H3v2h9.62c1.15.45 1.96.75 1.96 1.97 0 1-.81 1.67-2.28 1.67-1.54 0-2.93-.54-2.93-2.51H6.4c0 .55.08 1.13.24 1.58.81 2.29 3.29 3.3 5.67 3.3 2.27 0 5.3-.89 5.3-4.05 0-.3-.01-1.16-.48-1.94H21V12z"}),"StrikethroughS");t.default=r}))),ee=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(Z,null),type:"mark",format:"strikethrough",ref:t},e))})),te=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"}),"Code");t.default=r}))),ne=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(te,null),type:"mark",format:"code",ref:t},e))})),re=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"}),"FormatListBulleted");t.default=r}))),ae=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(re,null),type:"block",format:"bulleted-list",ref:t},e))})),oe=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"}),"FormatListNumbered");t.default=r}))),le=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(oe,null),type:"block",format:"numbered-list",ref:t},e))})),ie=s.makeStyles((function(e){return{toolbar:{backgroundColor:e.palette.grey[200],padding:e.spacing(1/4)}}}));var ce=function(e){var t=e.children;return v.createPortal(t,document.body)},ue=s.makeStyles((function(e){return{hoveringToolbar:{position:"absolute",padding:e.spacing(1/4),zIndex:1,top:"-10000px",left:"-10000px",opacity:0,backgroundColor:e.palette.grey[200],transition:"opacity 0.75s"}}}));function de(e){var t=e.open,n=e.title,r=e.label,a=e.format,o=e.defaultValue,l=e.onCancel,u=e.onSave,d=S(e,["open","title","label","format","defaultValue","onCancel","onSave"]),s=i.useState(o),m=x(s,2),f=m[0],p=m[1],h=function(e){l(),p(o)};return c.createElement(y,{open:t,onClose:h,"aria-labelledby":"dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0,maxWidth:d.maxWidth?d.maxWidth:"xs"},c.createElement(g,{id:"dialog-title"},n),c.createElement(k,null,c.createElement(E,{fullWidth:!0,multiline:!0,autoFocus:!0,defaultValue:o,label:r,variant:"outlined",onChange:function(e){return p(e.target.value)},required:!0})),c.createElement(w,null,c.createElement(b,{onClick:function(){return h()},color:"primary",variant:"outlined"},"Cancel"),c.createElement(b,{onClick:function(e){return u({format:a,value:f}),void p(o)},color:"primary",variant:"contained"},"Save")))}de.propTypes={open:u.bool.isRequired,onCancel:u.func.isRequired,onSave:u.func.isRequired,title:u.string,label:u.string,format:u.string,defaultValue:u.string};var se=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z"}),"AddCommentOutlined");t.default=r}))),me=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(se,null),type:"other",disableOnCollapse:!0,tooltip:"Add comment",format:"comment",ref:t},e))})),fe=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5z"}),"CallToActionOutlined");t.default=r}))),pe=c.forwardRef((function(e,t){return c.createElement(U,O({icon:c.createElement(fe,null),type:"other",disableOnSelection:!0,tooltip:"Add endnote",format:"endnote",ref:t},e))})),he=H(R((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=F(c),r=(0,F(K).default)(n.default.createElement("path",{d:"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"}),"Link");t.default=r})));function ve(e){var t=e.ref,n=e.onMouseDown,r=S(e,["ref","onMouseDown"]),a=o.useSlate();"function"!==typeof a.insertLink&&console.error("withLinks() is not initialized");var l=i.useState(!1),u=x(l,2),d=u[0],s=u[1],m=function(e){var t=e.editor,r=S(e,["editor"]);n?n(O({editor:t},r)):(t.rememberCurrentSelection(),s(!0))};return c.createElement(c.Fragment,null,c.createElement(U,O({icon:c.createElement(he,null),type:"link",tooltip:"Add link",format:"link",ref:t,onMouseDown:function(e){return m(e)}},r)),!n&&c.createElement(de,{open:d,title:"Add Link",label:"Link",format:"link",onCancel:function(){return s(!1)},onSave:function(e){var t,n=e.value;return t=n,s(!1),void a.insertLink(t)}}))}ve.propTypes={onMouseDown:u.func};var be=s.makeStyles((function(e){return{root:{backgroundColor:"#e1f5fe",cursor:"pointer"}}})),Ee=s.makeStyles((function(e){return{root:{cursor:"pointer"}}})),ye=s.makeStyles((function(e){return{text:{marginTop:e.spacing(.5),marginLeft:e.spacing(1)},textError:{color:e.palette.error.main}}}));function ge(e){var t=e.maxWords,n=ye(),r=o.useSlate(),a=r.children,l=r.getWordsLength(a),i=l>t;return c.createElement(C,{variant:"subtitle2",color:"textSecondary",className:n.text+" "+(i&&n.textError)},t?l+" / "+t:l," words")}ge.propTypes={maxWords:u.number};var ke=s.makeStyles((function(e){return{text:{marginTop:e.spacing(.5),marginLeft:e.spacing(1)},textError:{color:e.palette.error.main}}}));function we(e){var t=e.maxChars,n=ke(),r=o.useSlate(),a=r.children,l=r.getCharLength(a),i=l>t;return c.createElement(C,{variant:"subtitle2",color:"textSecondary",className:n.text+" "+(i&&n.textError)},t?l+" / "+t:l," characters")}we.propTypes={maxChars:u.number},t.AddCommentButton=me,t.BoldButton=J,t.BulletedListButton=ae,t.ButtonSeparator=function(e){var t=e.borderColor,n=S(e,["borderColor"]);return s.useTheme(),c.createElement(d,O({display:"inline"},n),c.createElement(d,{borderLeft:1,borderColor:t||"grey.400",marginLeft:"2px",marginRight:"2px",display:"inline"}))},t.CharCounter=we,t.CodeButton=ne,t.CommentElement=function(e){var t=e.element,n=e.onClick,r=e.children,a=e.attributes,o=be();return c.createElement(p,{title:"Comment: "+t.data.body},c.createElement("span",O({className:o.root},a,{onClick:function(e){return n&&n({event:e,element:t})}}),r))},t.EndnoteButton=pe,t.EndnoteElement=function(e){var t=e.element,n=e.onClick,r=e.attributes,a=e.children,o=Ee();return c.createElement(p,{placement:"top",title:""+t.data.value},c.createElement("sup",O({className:o.root},r,{onClick:function(e){return n&&n({event:e,element:t})}}),t.data.index||"x",a))},t.HoveringToolbar=function(e){var t=e.children,n=e.className,r=S(e,["children","className"]),l=ue(),u=i.useRef(),s=o.useSlate();return i.useEffect((function(){var e=u.current,t=s.selection;if(e)if(t&&o.ReactEditor.isFocused(s)&&!a.Range.isCollapsed(t)&&""!==a.Editor.string(s,t)){var n=window.getSelection().getRangeAt(0).getBoundingClientRect();e.style.opacity=1,e.style.top=n.top+window.pageYOffset-e.offsetHeight-4+"px",e.style.left=n.left+window.pageXOffset-e.offsetWidth/2+n.width/2+"px"}else e.removeAttribute("style")})),c.createElement(ce,null,c.createElement(d,O({borderRadius:"borderRadius",ref:u,className:n||l.hoveringToolbar},r),!t&&c.createElement(c.Fragment,null,c.createElement(J,null),c.createElement(X,null),c.createElement(Q,null),c.createElement(ee,null),c.createElement(ne,null)),t&&t))},t.ItalicButton=X,t.LinkButton=ve,t.MaterialEditable=D,t.MaterialEditor=j,t.MaterialSlate=L,t.NumberedListButton=le,t.SimpleDialog=de,t.StrikethroughButton=ee,t.Toolbar=function(e){var t=e.children,n=(e.className,S(e,["children","className"])),r=ie();return c.createElement(m.Box,O({className:r.toolbar,borderRadius:"borderRadius"},n),!t&&c.createElement(c.Fragment,null,c.createElement(J,null),c.createElement(X,null),c.createElement(Q,null),c.createElement(ee,null),c.createElement(ne,null),c.createElement(ae,null),c.createElement(le,null)),t&&c.createElement(c.Fragment,null,t))},t.ToolbarButton=U,t.UnderlinedButton=Q,t.WordCounter=ge,t.createMaterialEditor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default",t=T(N(M(l.withHistory(o.withReact(a.createEditor())))));return t.editorId=e,t},t.defaultHotkeys=I,t.defaultRenderElement=_,t.defaultRenderLeaf=V,t.withComments=function(e){var t=e.isInline;return e.isInline=function(e){return"comment"===e.type||t(e)},e.addComment=function(t,n){var r={id:t,type:"comment",children:[],data:n};e.wrapNode(r,e.selection||e.rememberedSelection)},e.syncComments=function(t){e.syncExternalNodes("comment",t)},e},t.withCounter=function(e){return e.getCharLength=function(t){return e.serialize(t).length},e.getWordsLength=function(t){var n=e.serialize(t);return n&&n.length?n.match(/\b[-?(\w+)?]+\b/gi).length:0},e.getParagraphLength=function(e){return e.map((function(e){return a.Node.string(e)})).join("\n").split(/\r\n|\r|\n/).length},e},t.withEndnotes=function(e){var t=e.isInline,n=e.isVoid;return e.isInline=function(e){return"endnote"===e.type||t(e)},e.isVoid=function(e){return"endnote"===e.type||n(e)},e.addEndnote=function(t,n){var r={id:t,type:"endnote",children:[{text:""}],data:n};return e.wrapNode(r,e.selection||e.rememberedSelection),r},e.previousEndnoteNode=function(t){var n=null,r=e.findNodesByType("endnote"),a=!0,o=!1,l=void 0;try{for(var i,c=r[Symbol.iterator]();!(a=(i=c.next()).done);a=!0){var u=i.value;if(u.id===t)break;n=u}}catch(d){o=!0,l=d}finally{try{!a&&c.return&&c.return()}finally{if(o)throw l}}return n},e.syncEndnotes=function(t){e.syncExternalNodes("endnote",t,!1)},e},t.withLinks=function(e){var t=e.isInline;return e.isInline=function(e){return"link"===e.type||t(e)},e.insertLink=function(t){e.isNodeTypeActive("link")&&e.unwrapNode("link");var n=e.selection||e.rememberedSelection;e.selection=n||e.selection;var r={type:"link",url:t,children:e.isCollapsed()?[{text:t}]:[]};e.wrapNode(r,n)},e}},243:function(e,t,n){e.exports=n(260)},260:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(15),l=n.n(o),i=n(211),c=n(62),u=n(143),d=n(6),s=n(10),m=function(){return[{type:"paragraph",children:[{text:"Basic example. This is editable "},{text:"rich",bold:!0},{text:" text, "},{text:"much",italic:!0},{text:" better than a "},{text:"<textarea>",code:!0},{text:"!"}]},{type:"paragraph",children:[{text:"Since it's rich text, you can do things like turn a selection of text "},{text:"bold",bold:!0},{text:", or add a semantically rendered block quote in the middle of the page, like this:"}]},{type:"block-quote",children:[{text:"A wise quote."}]}]};function f(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.createMaterialEditor)()}),[]);return a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)}},a.a.createElement(s.Toolbar,null),a.a.createElement(s.MaterialEditable,null))}function p(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.createMaterialEditor)()}),[]);return a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)}},a.a.createElement(s.HoveringToolbar,null),a.a.createElement(s.MaterialEditable,null))}var h=n(45),v=n(60),b=n(227),E=n.n(b),y=n(228),g=n.n(y),k=Object(i.a)((function(e){return{highlighted:{display:"inline-block",backgroundColor:"yellow",color:"red"},bigger:{fontSize:"125%"},customSlate:{backgroundColor:e.palette.grey[800],color:"white",borderWidth:1,borderColor:"transparent","&:hover":{borderWidth:1}},focused:{borderWidth:1,borderColor:e.palette.grey[400],"&:hover":{borderColor:e.palette.grey[400]}},customEditable:{fontFamily:"Courier"}}}));function w(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.createMaterialEditor)()}),[]),i=k();return a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)},className:i.customSlate,focusClassName:i.focused},a.a.createElement(s.Toolbar,null,a.a.createElement(s.ToolbarButton,{icon:a.a.createElement(E.a,null),type:"mark",format:"highlighted"}),a.a.createElement(s.ToolbarButton,{icon:a.a.createElement(g.a,null),type:"block",format:"bigger"})),a.a.createElement(s.MaterialEditable,{renderElement:function(e){var t=e.element,n=e.children,r=e.attributes,o=Object(v.a)(e,["element","children","attributes"]);switch(t.type){case"bigger":return a.a.createElement("p",Object.assign({className:i.bigger},r),n)}return Object(s.defaultRenderElement)(Object(h.a)({element:t,children:n,attributes:r},o))},renderLeaf:function(e){var t=e.leaf,n=e.attributes,r=e.children,o=e.text;return t.highlighted&&(r=a.a.createElement("span",{className:i.highlighted},r)),Object(s.defaultRenderLeaf)({leaf:t,children:r,attributes:n,text:o})},className:i.customEditable}))}var C=n(287);function O(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.withCounter)(Object(s.createMaterialEditor)())}),[]),i=Object(h.a)({},s.defaultHotKeys,{"mod+k":{type:"mark",value:"strikethrough"},"mod+h":{type:"block",value:"heading-one"}});return a.a.createElement(a.a.Fragment,null,a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)}},a.a.createElement(s.Toolbar,null),a.a.createElement(s.MaterialEditable,{hotkeys:i}),a.a.createElement(C.a,null),a.a.createElement(u.a,{display:"flex",justifyContent:"space-between",mr:1},a.a.createElement(s.WordCounter,{maxWords:42}),a.a.createElement(s.CharCounter,{maxChars:200}))))}function S(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.createMaterialEditor)()}),[]);return a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)}},a.a.createElement(s.Toolbar,null),a.a.createElement(s.HoveringToolbar,null),a.a.createElement(s.MaterialEditable,{readOnly:!0}))}var x=n(29),j=n(271),M=n(289),N=n(291),T=n(290),B=n(145),L=n.n(B),H=n(213),R=n(288);function A(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useMemo)((function(){return Object(s.withEndnotes)(Object(s.withComments)(Object(s.createMaterialEditor)()))}),[]),i=Object(r.useState)(!1),f=Object(d.a)(i,2),p=f[0],b=f[1],E=Object(r.useState)(!1),y=Object(d.a)(E,2),g=y[0],k=y[1],w=Object(r.useState)([]),C=Object(d.a)(w,2),O=C[0],S=C[1],B=Object(r.useState)([]),A=Object(d.a)(B,2),z=A[0],_=A[1],V=function(e){e.event,e.type;var t=e.format,n=e.editor;switch(t){case"comment":return n.rememberCurrentSelection(),void b(!0);case"endnote":return n.rememberCurrentSelection(),void k(!0);default:console.log("Add a case for format:",t)}},I=function(){console.log("Dialog cancelled"),b(!1),k(!1)},P=function(e,t){switch(e){case"comment":b(!1),console.log("save Comment:"+t);var n={id:(new Date).getTime(),body:t,originalValue:l.getSelectedText()};return l.addComment(n.id,n),void S([].concat(Object(x.a)(O),[n]));case"endnote":k(!1),console.log("save Endnote:"+t);var r={id:(new Date).getTime(),value:t,index:-1};l.addEndnote(r.id,r);var a=l.previousEndnoteNode(r.id),o=a?z.map((function(e){return e.id})).indexOf(a.id)+1:0,i=Object(x.a)(z);i.splice(o,0,r);var c=i.map((function(e,t){return t+=1,Object(h.a)({},e,{index:t})}));return void _(c)}};Object(r.useEffect)((function(){console.log("updated comments",O),l.syncComments(O)}),[O,l]),Object(r.useEffect)((function(){console.log("updated endnotes",z),l.syncEndnotes(z)}),[z,l]);var D=Object(r.useCallback)((function(e){var t=e.element,n=e.children,r=e.attributes,o=Object(v.a)(e,["element","children","attributes"]);switch(t.type){case"comment":return a.a.createElement(s.CommentElement,{element:t,attributes:r},n);case"endnote":return a.a.createElement(s.EndnoteElement,{element:t,attributes:r},n);default:return Object(s.defaultRenderElement)(Object(h.a)({element:t,children:n,attributes:r},o))}}),[]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(R.a,{container:!0,spacing:3},a.a.createElement(R.a,{item:!0,sm:6},a.a.createElement(s.MaterialSlate,{editor:l,value:n,onChange:function(e){return o(e)},onBlur:function(){return console.log("blur")}},a.a.createElement(s.Toolbar,null,a.a.createElement(s.BoldButton,null),a.a.createElement(s.ItalicButton,null),a.a.createElement(s.UnderlinedButton,null),a.a.createElement(s.StrikethroughButton,null),a.a.createElement(s.CodeButton,null),a.a.createElement(s.ButtonSeparator,null),a.a.createElement(s.BulletedListButton,null),a.a.createElement(s.NumberedListButton,null),a.a.createElement(s.ToolbarButton,{type:"block",format:"blockquote",disabled:!0}),a.a.createElement(s.AddCommentButton,{onMouseDown:function(e){return V(e)}}),a.a.createElement(s.EndnoteButton,{onMouseDown:function(e){return V(e)}})),a.a.createElement(s.HoveringToolbar,null,a.a.createElement(s.BoldButton,null),a.a.createElement(s.ItalicButton,null),a.a.createElement(s.UnderlinedButton,null),a.a.createElement(s.StrikethroughButton,null),a.a.createElement(s.AddCommentButton,{onMouseDown:function(e){return V(e)}})),a.a.createElement(s.MaterialEditable,{renderElement:function(e){return D(e)}})),a.a.createElement(s.SimpleDialog,{open:p,title:"Add comment",label:"Comment",defaultValue:"",format:"comment",onCancel:function(){return I()},onSave:function(e){var t=e.format,n=e.value;return P(t,n)}}),a.a.createElement(s.SimpleDialog,{open:g,title:"Add endnote",label:"Endnote",defaultValue:"",format:"endnote",onCancel:function(){return I()},onSave:function(e){var t=e.format,n=e.value;return P(t,n)}})),a.a.createElement(R.a,null,a.a.createElement(c.a,{variant:"caption"},"External Comments List"),0===O.length?a.a.createElement(c.a,null,"No comments"):a.a.createElement(j.a,{dense:!0},O.map((function(e){return a.a.createElement(M.a,{key:e.id},a.a.createElement(N.a,null,e.body),a.a.createElement(T.a,null,a.a.createElement(H.a,{edge:"end","aria-label":"delete",onClick:function(){return function(e){var t=O.filter((function(t){return t.id!==e}));console.log("deleteComment",t),S(t)}(e.id)}},a.a.createElement(L.a,null))))}))),a.a.createElement(u.a,{marginTop:2},a.a.createElement(c.a,{variant:"caption"},"External Endnotes List"),0===z.length?a.a.createElement(c.a,null,"No endnotes"):a.a.createElement(j.a,{dense:!0},z.map((function(e){return a.a.createElement(M.a,{key:e.id},a.a.createElement(N.a,null,"[",e.index,"] ",e.value),a.a.createElement(T.a,null,a.a.createElement(H.a,{edge:"end","aria-label":"delete",onClick:function(){return function(e){var t=z.filter((function(t){return t.id!==e})).map((function(e,t){return t+=1,Object(h.a)({},e,{index:t})}));console.log("deleteEndnote",t),_(t)}(e.id)}},a.a.createElement(L.a,null))))})))))))}function z(){var e=Object(r.useState)(m()),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useState)(!1),i=Object(d.a)(l,2),c=i[0],u=i[1],f=Object(r.useMemo)((function(){return Object(s.withLinks)(Object(s.createMaterialEditor)())}),[]);return a.a.createElement(a.a.Fragment,null,a.a.createElement(s.MaterialSlate,{editor:f,value:n,onChange:function(e){return o(e)}},a.a.createElement(s.Toolbar,null,a.a.createElement(s.LinkButton,{onMouseDown:function(e){return e.editor.rememberCurrentSelection(),void u(!0)}})),a.a.createElement(s.MaterialEditable,{hotkeys:null})),a.a.createElement(s.SimpleDialog,{open:c,title:"Add Link",label:"Link",format:"link",onCancel:function(){return u(!1)},onSave:function(e){var t,n=e.value;return t=n,u(!1),void f.insertLink(t)}}))}var _=Object(i.a)((function(e){return{intro:{marginLeft:e.spacing(2),paddingLeft:e.spacing(2)},air:{margin:e.spacing(2),padding:e.spacing(2)},readable:{maxWidth:800}}}));function V(){var e=_();return a.a.createElement(a.a.Fragment,null,a.a.createElement(u.a,{className:e.intro},a.a.createElement(c.a,{variant:"h1"},"UNICEF Material Slate"),a.a.createElement(c.a,null,"A simple rich text editor for React that uses Material UI and Slate")),a.a.createElement(u.a,{className:e.air},a.a.createElement(c.a,{variant:"h4"},a.a.createElement("a",{href:"https://github.com/unicef/material-slate/"},"View README on Github"))),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Basic Editor Example"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/Basic.js"},"View source code"),a.a.createElement(f,null)),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Hover toolbar"),a.a.createElement(c.a,null,"Toolbar appears on selecting a text"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/Hovering.js"},"View source code"),a.a.createElement(p,null)),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Custom Buttons & Styles"),a.a.createElement(c.a,null,"Create custom buttons and custom style"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/CustomButtons.js"},"View source code"),a.a.createElement(w,null)),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Word and character counter"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/Counter.js"},"View source code"),a.a.createElement(O,null)),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Link Example"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/Link.js"},"View source code"),a.a.createElement(z,null)),a.a.createElement(u.a,{className:"".concat(e.air," ").concat(e.readable," ")},a.a.createElement(c.a,{variant:"h2"},"Read only mode"),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/ReadOnly.js"},"View source code"),a.a.createElement(S,null)),a.a.createElement(u.a,{className:e.air},a.a.createElement(c.a,{variant:"h2"},"Advanced usage "),a.a.createElement("a",{href:"https://github.com/unicef/material-slate/blob/master/example/src/Advanced.js"},"View source code"),a.a.createElement(A,null)))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[243,1,2]]]);
//# sourceMappingURL=main.3b405620.chunk.js.map