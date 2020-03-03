
import React from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import Basic from './Basic'
import Hovering from './Hovering'

import Advanced from './Advanced'

export default hot(module)(function App() {
  return (
    <div className="App">
      <h2>Advanced usage </h2>
      <a href="http://url">Source code</a>
      <Advanced />
     <h2>Basic Editor Example</h2>
     <a href="http://url">Source code</a> 
     <Basic />
     <h2>Hover toolbar</h2>
     <p>Toolbar appears on selecting a text</p>
     <a href="http://url">Source code</a> 
     <Hovering />
     </div>
  );
})



