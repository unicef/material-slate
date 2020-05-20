# Rich Editor
[![npm version](https://badge.fury.io/js/%40unicef%2Fmaterial-slate.svg)](https://badge.fury.io/js/%40unicef%2Fmaterial-slate)
![Node.js CI](https://github.com/unicef/material-slate/workflows/Node.js%20CI/badge.svg)

Rich text editor is a [React](https://reactjs.org) component based on [Slate](https://www.slatejs.org/examples/richtext) with the [Material UI](https://material-ui.com/)look and feel.


![Example of material slate](https://raw.githubusercontent.com/unicef/material-slate/master/example/material-slate.gif)

## [View live demo](https://unicef.github.io/material-slate/) 

Status: alfa.
Pending: 
- Improve documentation
- Improve performance
- Create unit tests

## Usage 

Install 
```
npm install --save @unicef/material-slate
```

Include the editor in your component

```jsx static
import React from "react"
import { useState, useMemo } from "react"
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  Toolbar
} from '@unicef/material-slate' 

export default function MyComponent() {
  // Holds the value of the editor
  const [value, setValue] = useState({})

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), [])

  return (
    <MaterialSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar />
      <MaterialEditable />
    </MaterialSlate>
  )
}
```

### [Reference documentation](https://unicef.github.io/material-slate/docs/) 

Because this editor is just a wrapper of [Slate](https://github.com/ianstormtaylor/slate), it can be fully extended following the [Slate docs](https://docs.slatejs.org/).

[More examples](https://github.com/unicef/material-slate/tree/master/example/src)

### Toolbars
Two types of button bars can be added:
 - `<Toolbar />`. Regular button bar that appears at the top
 - `<HoveringToolbar />`). A toolbar that appears over a selected text. It is displayed only when a text is selected.

 Toolbars shall be included within `<MaterialSlate />` component.

### Select toolbar buttons

By default both toolbars display a predefined set of buttons. To customize the buttons that appear in your toolbar, add the buttons you want as children.

For example if you want to display only bold and italic buttons: 
```jsx static
//...
import { BoldButton, ItalicButton } from '@unicef/material-slate'
//...

//...
<HoveringToolbar >
  <BoldButton />
  <ItalicButton />
</HoveringToolbar>
``` 

The complete list of available buttons is in [/src/component/Buttons](https://github.com/unicef/material-slate/tree/master/src/components/Buttons) folder.

### Extend toolbar with custom buttons
In order to create your custom behavior you can add a [ToolbarButton](https://unicef.github.io/material-slate/docs/#toolbarbutton) in a toolbar.

The steps 
1. Add the customized `ToolbarButton` to the toolbar
2. Extend `renderElement` 

You have a complete example in [advanced example](https://github.com/unicef/material-slate/blob/master/example/src/Advanced.js)


## Development
In order to extend the components, clone the project and install the dependencies.

```bash
git clone https://github.com/unicef/material-slate.git
cd material-slate
npm install
npm start
```

In another window, we can launch the example app
```bash
cd example
npm start
```

### `npm start`

Builds the library of components in the `dist` folder.

```bash
npm start
```

Apart from the [documentation](https://unicef.github.io/material-slate/) The package comes with an [example](https://github.com/unicef/material-ui-texteditor/tree/master/example) app - create-react-app - which is useful for testing and running the components.

```bash
cd example
npm install # only if it is first time
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.

### `npm run build`

Builds the component library for production. Leaves the output in the `dist` folder.

### `npm run docs`

Generates the documentation to be viewed in [http://localhost:6060](http://localhost:6060).

Page reloads on any change. Lint errors are displayed in the console, too.

We use [styleguidelist](https://react-styleguidist.js.org/) for documenting our custom components.

### `npm run build:docs`

Builds the styleguide and leaves the output is the `styleguide/` folder.

### `npm run build:site`

Builds the both example and styleguide for production. Leaves the output in the `gh-pages-build` folder.

### `npm run deploy`

Deploys the output of `build:site` in the [gh-pages](https://unicef.github.io/material-slate/).

### `npm publish`

Publishes the package in npm.


## About UNICEF

[UNICEF](https://www.unicef.org/) works in over 190 countries and territories to protect the rights of every child. UNICEF has spent more than 70 years working to improve the lives of children and their families. In UNICEF, we **believe all children have a right to survive, thrive and fulfill their potential – to the benefit of a better world**.

[Donate](https://donate.unicef.org/donate/now)


## Collaborations and support

Just fork the project and make a pull request. You may also [consider donating](https://donate.unicef.org/donate/now).


## License MIT
Copyright 2020 UNICEF http://www.unicef.org 
Developed by ICTD, Solutions Center and Support, Digital Tools and Platforms, Custom Applications Team, New York.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
