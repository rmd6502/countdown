import React from 'react';
import './App.css';
import CountdownTimer from './Components/CountdownTimer'

function App() {
  return (
    <div className="App">
      <header className="App-header">Hello</header>
      <CountdownTimer callback={() => console.log("hooray")} initialTime="300000" />
    </div>
  );
}

export default App;
