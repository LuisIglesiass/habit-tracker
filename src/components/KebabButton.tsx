import React from 'react';
import { useState, useContext } from "react";
import { MoreVertical } from "lucide-react";
import { HabitsContext } from "../context/HabitsContext";

interface KebabButtonProps {
  habitId: number;
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

export default function KebabButton({ habitId, onEdit, onDelete }: KebabButtonProps) {
  const [open, setOpen] = useState(false);
  const habitsContext = useContext(HabitsContext);
  if (!habitsContext) {
    return <div>Error: HabitsContext is undefined</div>;
  } 
  const { removeHabit } = habitsContext;

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
              onEdit();
            }}
            className="menu-item"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              removeHabit(habitId);
              onDelete();
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
