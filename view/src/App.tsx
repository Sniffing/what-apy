import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import stores from './stores/Stores';
import { SavingsPage } from './pages/savings';
import { BaseRatePage } from './pages/base-rate';

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <BaseRatePage/>
        <SavingsPage/>
      </div>
    </Provider>
  );
}

export default App;
