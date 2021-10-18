import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Blockchain } from './features/blockchain/Blockchain';

function App() {
  

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <Counter />  */}
        <Blockchain />
      {/* </header> */}
    </div>
  );
}

export default App;
