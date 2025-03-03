import { useState } from "react";
import { MoreVertical } from "lucide-react";

// interface KebabButtonProps {
// //   onEdit: () => void;
// //   onDelete: () => void;
// }

// export default function KebabButton({ onEdit, onDelete }: any) {


export default function KebabButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="kebab-menu">
      <button className="kebab-button" onClick={() => setOpen(!open)}>
        <MoreVertical size={20} color="#A0B2C0"/>
      </button>
      {open && (
        <div className="menu-dropdown">
          <button
            onClick={() => {
              setOpen(false);
            //   onEdit();
            }}
            className="menu-item"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
            //   onFrecuency();
            }}
            className="menu-item"
          >
            Frequency
          </button>
          <button
            onClick={() => {
              setOpen(false);
            //   onDelete();
            }}
            className="menu-item delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
