
import React from "react"
import { hot } from "react-hot-loader" //Auto refresh load
import Basic from './Basic'
import Advanced from './Advanced'

export default hot(module)(function App() {
  return (
    <div className="App">
      <h1>Basic Editor Example</h1>
      <a href="http://url">Source code</a> 
      <Basic />

      <h1>Advanced usage </h1>
      <a href="http://url">Source code</a>
      <Advanced />
    </div>
  );
})



