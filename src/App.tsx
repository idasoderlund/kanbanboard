import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
Import Board from './Components/Board.tsx';
Import ColumnPage from './Pages/ColumnPage.js';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Huvudvy</Link>
      </nav>
      <Routes>
        <Rout path="/" element={<Board />} />
        <Rout path="column/:columnId" element={<ColumnPage />} />
      </Routes>
    </Router>
  );
}

export default App
