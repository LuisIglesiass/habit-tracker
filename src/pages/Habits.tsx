import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import KebabButton from "../components/KebabButton";

const Habits: React.FC = () => {
    const [habit, setHabit] = useState('');
    const [habits, setHabits] = useState<Habits[]>([
        { id: 1, name: 'Eat 80g of protein'},
        { id: 2, name: 'Go for a walk'},
        { id: 3, name: 'Walk the dog'},
    ]);
    const [isEditing, setIsEditing] = useState(false);

    interface Habits {
        id: number;
        name: string;
    }

    const addHabit = () => {
        setIsEditing(true);
    };

    const saveHabit = () => {
        const newHabit = { id: habits.length + 1, name: habit};
        setHabits([...habits, newHabit]);
        setHabit('');
        setIsEditing(false);
    };

    return (
        <div>
            <NavBar />
            <header>
                <div className="habits-header-container">
                    <h1 className="habits-header-title">YOUR HABITS</h1>
                    <button className="secondary-button" onClick={addHabit}>Add</button>
                </div>
            </header>
            <div className="habits-page-container">
                <div className="habits-page-list">
                    <ul>
                        {habits.map(habit => (
                            <li key={habit.id}>
                                <p>{habit.name}</p>
                                <KebabButton />
                            </li>
                        ))}
                    </ul>
                    {isEditing && (
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