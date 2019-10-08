import React from 'react'
import logo from '../../assets/img/logo.svg'
import './App.css';
import { VFrame } from '../../containner/VFrame'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <VFrame/>
      </header>
    </div>
  );
}

export default App;
