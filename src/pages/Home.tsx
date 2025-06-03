import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import RedirectButton from "../components/RedirectButton";
import "./Home.css";
import axios from "axios";

const Home: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<number>(0);
  const [incompleteHabits, setIncompleteHabits] = useState<number>(0);

  interface Habit {
    id: number;
    name: string;
    completed: boolean;
  }

  const userId = localStorage.getItem('userId');

  useEffect(() => {
      const fetchHabits = async () => {
          if (userId) {
              try {
                  const response = await axios.get(`http://localhost:3000/api/habits/with-entries/${userId}`);
                  setHabits(response.data);
                  const completedCount = response.data.filter((h: Habit) => h.completed).length;
                  const incompleteCount = response.data.filter((h: Habit) => !h.completed).length;
                  setCompletedHabits(completedCount);
                  setIncompleteHabits(incompleteCount);
              } catch (error) {
                  console.error("Error while fetching habits:", error);
              }
          }
      };
      fetchHabits();
  }, [userId]);

  const formatDate = (date: Date) => {
    return date.toISOString();
  };

  const handleCheckboxChange = async (habit: Habit, isChecked: boolean) => {
    const now = formatDate(new Date());

    if (isChecked) {
      try {
        await axios.post(`http://localhost:3000/api/habits/completed/${habit.id}`, {
          habit_id: habit.id,
          date: now,
          completed: true
        });
      } catch (error) {
        console.error("Error while marking habit as completed:", error);
      }}
    else {
      try {
        await axios.post(`http://localhost:3000/api/habits/incompleted/${habit.id}`, {
          habit_id: habit.id,
          date: now,
          completed: false
        });
      } catch (error) {
        console.error("Error while deleting habit:", error);
      }
    }
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/habits/${userId}`);
        setHabits(response.data);
        const completedCount = response.data.filter((h: Habit) => h.completed).length;
        const incompleteCount = response.data.filter((h: Habit) => !h.completed).length;
        setCompletedHabits(completedCount);
        setIncompleteHabits(incompleteCount);
      } catch (error) {
        console.error("Error while fetching habits:", error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="home-container">
        <h2>Your Today's Habits</h2>
        <div className="card">
          {habits.length === 0 ? (
            <p>No habits created yet.</p>
          ) : (
            <ul>
              {habits.map(habit => (
                <li key={habit.id} className="checkbox-container">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id={habit.id.toString()}
                    defaultChecked={habit.completed}
                    onChange={(e) => handleCheckboxChange(habit, e.target.checked)}
                  />
                  <label htmlFor={habit.id.toString()}>{habit.name}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="button-container">
          <RedirectButton label="Manage habits" direction="/habits" />
          <RedirectButton label="See your stats" direction="/dashboard" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;