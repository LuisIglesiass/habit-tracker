import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import RedirectButton from "../components/RedirectButton";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import "../Home.css";

const Home: React.FC = () => {
  return (
  <div>
    <NavBar/>
    <div className="home-container">
      <div className="grid-container-home">
        {/* Your Favorite Habits */}
        <div className="card">
          <h2>Your Favorite Habits</h2>
          <div className="chart-container">
            <PieChart/>
          </div>
          <p>You improved your performance 10% since last week!</p>
        </div>

        {/* This Week's Habits */}
        <div className="card">
          <h2>This week you completed 80% of your habits!</h2>
          <div className="chart-container">
            <BarChart/>
          </div>
          <p>Keep going!</p>
        </div>

        {/* Today's Habits */}
        <div className="card">
          <h2>Your Today's Habits</h2>
            <ul>
            <li className="checkbox-container">
              <input type="checkbox" className="custom-checkbox" id="1"/>
              <label htmlFor="1">Drink 2L of water</label>
            </li>
            <li className="checkbox-container">
              <input type="checkbox" className="custom-checkbox" id="2"/>
              <label htmlFor="2">Do 30 minutes of sport</label>
            </li>
            <li className="checkbox-container">
              <input type="checkbox" className="custom-checkbox" id="3"/>
              <label htmlFor="3">Read 10 pages of a book</label>
            </li>
            <li className="checkbox-container">
              <input type="checkbox" className="custom-checkbox" id="4"/>
              <label htmlFor="4">Learn Portuguese for 20 minutes</label>
            </li>
            <li className="checkbox-container">
              <input type="checkbox" className="custom-checkbox" id="5"/>
              <label htmlFor="5">Play football for 2 hours</label>
            </li>
            </ul>
        </div>

        {/* Top Trending Habits */}
        <div className="card">
          <h2>Top Trend Habits from Other Users</h2>
          <ul>
            <li>Meditate 15 minutes</li>
            <li>Go for a 2 miles run</li>
            <li>Go to the gym for 1 hour</li>
          </ul>
        </div>
      </div>

      {/* Botones */}
      <div className="button-container">
        <RedirectButton label="Manage habits" direction="/habits"/>
        <RedirectButton label="See your stats" direction="/dashboard"/>
      </div>
    </div>
    <Footer/>
  </div>
)};

export default Home;