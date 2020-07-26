import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import stores from './stores/Stores';
import { Savings } from './pages/savings';

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <Savings/>
      </div>
    </Provider>
  );
}

export default App;
