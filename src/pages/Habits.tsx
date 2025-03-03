import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import KebabButton from "../components/KebabButton";

const Habits: React.FC = () => {
  return (
  <div>
    <NavBar/>
    <header>
        <div className="habits-header-container">
            <h1 className="habits-header-title">YOUR HABITS</h1>
            <button className="secondary-button">Add</button>
        </div>
    </header>
    <div className="habits-page-container">
        <div className="habits-page-list">
            <ul>
                <li>
                    <p>Eat 5 fruits</p>
                    <KebabButton/>
                </li>
                <li>
                    <p>Do 30 minutes of sport</p>
                    <KebabButton/>
                </li>
                <li>
                    <p>Sleep 8 hours</p>
                    <KebabButton/>
                </li>
                <li>
                    <p>Drink 3L of water</p>
                    <KebabButton/>
                </li>
                <li>
                    <p>Eat at least 80g of protein </p>
                    <KebabButton/>
                </li>
            </ul>
        </div>
    </div>
    <Footer/>
  </div>
)};

export default Habits;