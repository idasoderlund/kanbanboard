import React from "react";
import type { Task } from "../Types/Types";

//Definerar props som modalkomponenten ska ta emot
interface ModalProps {
  task?: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (TaskId: string) => void;
}
//en komponent med props av typen modalprops
const Modal: React.FC<ModalProps> = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  //Om ingen uppgift är definerad så ska inget renderas
  if (!task) return null;

  //Funktion som körs när användaren klickar på spara knappen
  const handleSave = () => {
    //Skickar uppdaterad task till onSave funktionen som är en prop med ny titel och beskrivning
    onSave({ ...task, title, description });
    //Stänger modalen efter sparning
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
        <textarea //Teaxtare för att ange en uppgiftsbeskrivning
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beskrivning"
          style={{ width: "100%", height: "100px" }}
        />
        <div //knappsektion med tre knappar för spara delete och avbryt
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
