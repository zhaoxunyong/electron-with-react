Zero finance project's scaffold.

## install yarn

A new package manager for JavaScript.

```bash
npm install -g yarn
```

## vscode plugin

You can install all of the following plugins manually in your vscode IDE:

```bash
#javascript
eslint
Color Picker
npm
Debugger for Chrome
Prettier
Eclipse Keymap
#react
ES7 React/Redux/GraphQL/React-Native snippets
#git
GitLens
zerofinance-git
#others
Local History
XML Tools
koroFileHeader
AutoFileName
```

Also you can install above plugins through following commands, but first at all, you must ensure the code command available:

```bash
#common
code --install-extension dbaeumer.vscode-eslint
code --install-extension anseki.vscode-color
code --install-extension eg2.vscode-npm-script
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension alphabotsec.vscode-eclipse-keybindings
#only for react
code --install-extension dsznajder.es7-react-js-snippets
#only for vue
code --install-extension octref.vetur
code --install-extension sdras.vue-vscode-snippets
#git
code --install-extension eamodio.gitlens
code --install-extension zerofinance.zerofinance-git
#others
code --install-extension xyz.local-history
code --install-extension DotJoshJohnson.xml
code --install-extension esbenp.prettier-vscode
code --install-extension OBKoro1.korofileheader
code --install-extension JerryHong.autofilename
code --install-extension wix.vscode-import-cost
```

Add following config into your settings.json:

Notice: This is a global configuration, not a project configuration.

```json
"emmet.triggerExpansionOnTab": true,
"emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "vue-html": "html",
    "razor": "html",
    "plaintext": "jade"
},
"fileheader.configObj": {
  "autoAdd": false
},
// header annotation
"fileheader.customMade": {
    "Author": "Your name",
    "Date": "Do not edit",
    "LastEditors": "Your name",
    "LastEditTime": "Do not edit",
    "Description": ""
},
// function annotation
"fileheader.cursorMode": {
    "Date": "Do not edit",
    "description": "",
    "param": ""
}
```

File header annotation shortcut:

-   window: ctrl+alt+i
-   mac: ctrl+cmd+i

Function annotation shortcut keys:

-   windows: ctrl+alt+t
-   mac: ctrl+cmd+t

## create new aproject

For instance, the new project's name is called my-app.

```bash
git clone http://gitlab.aeasycredit.net/commons/zero-react-admin.git my-app
cd my-app
```

## initialize

```bash
yarn install
```

## development

```
yarn start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## production

```bash
yarn build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## architecture

```
.
├── build
├── node_modules
├── public
│   ├── api
│   │   └── ...                       // api mock
│   └── index.html                    // main entry
├── commons                           // Common
│   ├── business                      // Common business related components
│   │   ├── myTab                     // tab
│   │   ├── zeroList                  // list
│   │   └── ...
│   ├── constant
│   │   └── pubSub.js                 // publish and subscribe constant defined
├── config
│   ├── config.js                     // global config
│   ├── development.js                // development configuration
│   ├── router.js                     // router config
│   ├── en.json                       // i18n file configuration: english
│   └── zh.json                       // i18n file configuration: chinese
├── pages
│   ├── home                          // Home page
│   │   ├── index.js                  // entry
│   │   ├── style.js                  // style component
│   │   ├── components                // page component
│   │   ├── store                     // redux
│   │       ├── actionCreators.js     // action
│   │       ├── actionTypes.js        // action constant defined
│   │       ├── index.js              // redux entry
│   │       └── reducer.js            // reducer
│   ├── ...
├── statics                           // static file, usually image files
│   ├── css                           // css
│   └── images                        // images
├── store
│   ├── index.js
│   └── reducer.js                    // It can define different namespace reducer
├── utils                             // Util tool
│   └── http.js                       // axios
├── App.js                            // Main component
├── index.js                          // Main js entry
└── style.js                          // Gloal style
```

## Reference

-   https://blog.rsuitejs.com/2018/03/28/build-a-app-width-electron-and-react/
-   https://github.com/hiyangguo/electron-with-react
-   https://juejin.im/post/5c46ab47e51d45522b4f55b1
