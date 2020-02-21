
import React from "react" 
import {hot} from "react-hot-loader" //Auto refresh load
import { RichSlate } from '../src'

export default hot(module)(function App() {
    return(
        <div className="App">
        <h1> Hello, World!</h1>
        <RichSlate></RichSlate>
      </div>
    );
})

