import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TaskContext } from "../Contexts/Context";
import type { Column, Task } from "../Types/Types";

const ColumnPage: React.FC = () => {
  //Hämta kolumnens id och URL
  const { columnId } = useParams<{ columnId: string }>();

  //Använd context hook för att hämta data från taskContext
  const ctx = useContext(TaskContext);

  //Kontroll om context finns om ej kasta error
  if (!ctx) throw new Error("TaskContext saknas");

  //extrahera kolumn från conext
  const { columns } = ctx;

  //Söka efter kolumn vars id matchar url parametern
  const column = columns.find((c: Column) => c.id === columnId);

  //Om kolumnen ej finns visa meddelande
  if (!column) return <div>Kolumnen finns inte.</div>;

  //Rendera kolumntitel och dess uppgifter
  //Loopar igenom kolumnens uppgifter och visar varje uppgift
  return (
    <div>
      <h1>{column.title}</h1>
      {column.tasks.map((task: Task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};

export default ColumnPage;
