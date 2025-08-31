import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Board from "./Components/Board.tsx";
import ColumnPage from "./Pages/ColumnPage.tsx";
import { TasksProvider } from "./Contexts/TaskContexts.tsx";
import { DndProvider } from "react-dnd/dist";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <TasksProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <nav>
            <Link to="/">Huvudvy</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="column/:columnId" element={<ColumnPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </TasksProvider>
  );
};

export default App;
