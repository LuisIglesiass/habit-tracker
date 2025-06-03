import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import KebabButton from "../components/KebabButton";
import axios from 'axios';

interface Habit {
    id: number;
    name: string;
}

const Habits: React.FC = () => {
    const [habit, setHabit] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
    const [habits, setHabits] = useState<Habit[]>([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchHabits = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/habits/${userId}`);
                    setHabits(response.data);
                } catch (error) {
                    console.error("Error while fetching habits:", error);
                }
            }
        };
        fetchHabits();
    }, [userId]);

    const saveHabit = async () => {
        if (editingHabitId !== null) {
            await axios.put(`http://localhost:3000/api/habits/edit/${editingHabitId}`, { 
                user_id: userId,
                name: habit 
            });
            setEditingHabitId(null);
        } else {
            const response = await axios.post(`http://localhost:3000/api/habits`, { 
                user_id: userId,
                name: habit,
            });
            console.log(response.data);
        }
        setHabit('');
        setIsEditing(false);
        if (userId) {
            const response = await axios.get(`http://localhost:3000/api/habits/${userId}`);
            setHabits(response.data);
        }
    };

    const deleteHabit = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/habits/remove/${id}`);
            if (userId) {
                const response = await axios.get(`http://localhost:3000/api/habits/${userId}`);
                setHabits(response.data);
            }
        } catch (error) {
            console.error("Error while deleting habit:", error);
        }
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
                                        <KebabButton habitId={habitItem.id} onEdit={() => {
                                            setEditingHabitId(habitItem.id);
                                            setHabit(habitItem.name);
                                            setIsEditing(true);
                                        }} onDelete={() => deleteHabit(habitItem.id)} />
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