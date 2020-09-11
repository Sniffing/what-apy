import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import 'antd/dist/antd.css';
import stores from './stores/Stores';
import { SavingsPage } from './pages/savings';

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <SavingsPage/>
      </div>
    </Provider>
  );
}

export default App;
