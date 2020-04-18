import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home';
import './App.css';

function App() {
  return (
    <Router basename="/json">
      <Route path="/" component={Home}></Route>
    </Router>
  );
}

export default App;
