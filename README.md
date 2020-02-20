# material-ui-texteditor
Rich text editor based on Slate for Material UI (React)

## Development

In order to extend the components, clone the project and install the dependencies.

```bash
git clone https://github.com/unicef/material-ui-texteditor.git
npm install
```

The following commands are available:

### `npm start`

Builds the library of components in the `dist`folder.

```bash
npm start
```

Apart from the [documentation](https://unicef.github.io/material-ui-texteditor/) The package comes with an [example](https://github.com/unicef/material-ui-texteditor/tree/master/example) app - create-react-app - which is useful for testing and running the components.

```bash
cd example
npm install # only if it is first time
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.

### `npm run build`

Builds the component library for production. Leaves the output in the `dist` folder.

### `npm run styleguide`

Generates the documentation to be viewed in [http://localhost:6060](http://localhost:6060).

Page reloads on any change. Lint errors are displayed in the console, too.

We use [styleguidelist](https://react-styleguidist.js.org/) for documenting our custom components.

### `npm run styleguide:build`

Builds the styleguide for production. The output is stored in `styleguide` folder.

### `npm run build:site`

Builds the both example and styleguide for production. Leaves the output in the `gh-pages-build` folder.

### `npm run deploy`

Deploy's the app to the [gh-pages site](https://unicef.github.io/material-ui-richeditor/).

## License

Distributed under GLPv3.
