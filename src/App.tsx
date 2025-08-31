import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Board from "../src/Components/Board.tsx";
import ColumnPage from "../src/Pages/ColumnPage.tsx";
import { TasksProvider } from "./Contexts/TaskContexts.tsx";

const App: React.FC = () => {
  return (
    <TasksProvider>
      <Router>
        <nav>
          <Link to="/">Huvudvy</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="column/:columnId" element={<ColumnPage />} />
        </Routes>
      </Router>
    </TasksProvider>
  );
};

export default App;
