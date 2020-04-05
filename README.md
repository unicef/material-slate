# Rich Editor
Rich text editor is a [React](https://reactjs.org) component based on [Slate](https://www.slatejs.org/examples/richtext) with the [Material UI](https://material-ui.com/)look and feel.

## [View demo](https://unicef.github.io/material-ui-richeditor/example/) 

The editor comes with the following functionality:
- Bold
- Italic
- Headers
- Unordered list
- Ordered list
- Strike through
- Code
- Comments
- Endnotes

Two types of button bars can be added:
 - One at the top
 - Hovering (displayed when text is selected)

Because this editor is just a wrapper of Slate, it can be fully extended following the [Slate docs](https://docs.slatejs.org/).

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

## Collaborating

Just fork the project and make a pull request.

## License MIT
Copyright 2020 UNICEF http://www.unicef.org 
Developed by ICTD, Solutions Center and Support, Digital Tools and Platforms, Custom Applications Team, New York.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
