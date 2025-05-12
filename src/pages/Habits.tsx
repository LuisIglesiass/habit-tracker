import React, { useContext, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import KebabButton from "../components/KebabButton";
import { HabitsContext } from "../context/HabitsContext";

const Habits: React.FC = () => {
    const [habit, setHabit] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
    const habitsContext = useContext(HabitsContext);
    if (!habitsContext) {
        return <div>Error: HabitsContext is undefined</div>;
    }
    const { habits, addHabit, editHabit } = habitsContext;

    const saveHabit = () => {
        if (editingHabitId !== null) {
            editHabit(editingHabitId, habit);
            setEditingHabitId(null);
        } else {
            addHabit(habit);
        }
        setHabit('');
        setIsEditing(false);
    };

    return (
        <div>
            <NavBar />
            <header>
                <div className="habits-header-container">
                    <h1 className="habits-header-title">YOUR HABITS</h1>
                    <button className="secondary-button" onClick={() => setIsEditing(true)}>Add</button>
                </div>
            </header>
            <div className="habits-page-container">
                <div className="habits-page-list">
                    <ul>
                        {habits.map(habitItem => (
                            <li key={habitItem.id}>
                                {isEditing && editingHabitId === habitItem.id ? (
                                    <div className="new-habit-form">
                                        <input
                                            type="text"
                                            value={habit}
                                            onChange={(e) => setHabit(e.target.value)}
                                            placeholder={habitItem.name}
                                        />
                                        <button onClick={saveHabit}>Save</button>
                                    </div>
                                ) : (
                                    <>
                                        <p>{habitItem.name}</p>
                                        <KebabButton habitId={habitItem.id} habitName={habitItem.name} onEdit={() => {
                                            setEditingHabitId(habitItem.id);
                                            setHabit(habitItem.name);
                                            setIsEditing(true);
                                        }} />
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                    {isEditing && editingHabitId === null && (
                        <div className="new-habit-form">
                            <input
                                type="text"
                                value={habit}
                                onChange={(e) => setHabit(e.target.value)}
                                placeholder="New habit"
                            />
                            <button onClick={saveHabit}>Save</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Habits;