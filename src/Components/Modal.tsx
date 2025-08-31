import React from "react";
import type { Task } from "../Types/Types";

interface ModalProps {
  task?: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (TaskId: string) => void;
}

const Modal: React.FC<ModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  if (!task) return null;

  const handleSave = () => {
    onSave({ ...task, title, description });
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "300px",
        }}
      >
        <h2>Task details</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titel"
          style={{ width: "100%", marginBottom: "10px" }}
        ></input>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beskrivning"
          style={{ width: "100%", height: "100px" }}
        />
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={handleSave}>Spara</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Avbryt</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
