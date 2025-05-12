import React, { useContext } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import RedirectButton from "../components/RedirectButton";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { HabitsContext } from "../context/HabitsContext";
import "../Home.css";

const Home: React.FC = () => {
  const habitsContext = useContext(HabitsContext);
  const habits = habitsContext?.habits || [];
  const { completedHabits = [], incompleteHabits = [], setCompletedHabits, setIncompleteHabits } = habitsContext || {};

  interface Habit {
    id: number;
    name: string;
    completed: boolean;
  }

  const handleCheckboxChange = (habit: Habit, isChecked: boolean) => {
    const updatedHabit = { ...habit, completed: isChecked };
    const updatedHabits = habits.map(h => h.id === habit.id ? updatedHabit : h);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));

    if (isChecked) {
      setCompletedHabits((prev: Habit[]) => {
        const updatedCompletedHabits = [...prev, updatedHabit];
        localStorage.setItem('completedHabits', JSON.stringify(updatedCompletedHabits));
        return updatedCompletedHabits;
      });
      setIncompleteHabits((prev: Habit[]) => {
        const updatedIncompleteHabits = prev.filter((h: Habit) => h.id !== habit.id);
        localStorage.setItem('incompleteHabits', JSON.stringify(updatedIncompleteHabits));
        return updatedIncompleteHabits;
      });
    } else {
      setCompletedHabits((prev: Habit[]) => {
        const updatedCompletedHabits = prev.filter((h: Habit) => h.id !== habit.id);
        localStorage.setItem('completedHabits', JSON.stringify(updatedCompletedHabits));
        return updatedCompletedHabits;
      });
      setIncompleteHabits((prev: Habit[]) => {
        const updatedIncompleteHabits = [...prev, updatedHabit];
        localStorage.setItem('incompleteHabits', JSON.stringify(updatedIncompleteHabits));
        return updatedIncompleteHabits;
      });
    }
  };

  const data = {
    labels: ['Completadas', 'Incompletas'],
    datasets: [
      {
        label: 'Hábitos diarios',
        data: [completedHabits.length, incompleteHabits.length],
        backgroundColor: ['#4CAF50', 'red'],
        borderColor: ['#00000', '#00000'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="home-container">
        <div className="grid-container-home">
          <div className="card">
            <h2>Your Favorite Habits</h2>
            <div className="chart-container">
              <PieChart data={data} />
            </div>
            <p>You improved your performance 10% since last week!</p>
          </div>

          <div className="card">
            <h2>This week you completed 80% of your habits!</h2>
            <div className="chart-container">
              <BarChart />
            </div>
            <p>Keep going!</p>
          </div>

          <div className="card">
            <h2>Your Today's Habits</h2>
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
          </div>

          <div className="card">
            <h2>Top Trend Habits from Other Users</h2>
            <ul>
              <li>Meditate 15 minutes</li>
              <li>Go for a 2 miles run</li>
              <li>Go to the gym for 1 hour</li>
            </ul>
          </div>
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