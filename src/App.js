import React from 'react';
import './App.scss';
import routes from './routes'

function App() {
  return (
    <div className="App">
      <h1>Head Games</h1>
      {routes}
    </div>
  );
}

export default App;
