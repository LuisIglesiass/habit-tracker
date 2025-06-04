import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Dropdown from '../components/DropdownButton';
import ProgressResume from '../components/ProgressResume';
import WeeklyRecap from '../components/WeeklyRecap';
import ActualProgress from '../components/ActualProgress';
import AddHabits from '../components/AddHabits';
import '../dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <header>
        <div className="habits-header-container">
          <h1 className="habits-header-title">YOUR DASHBOARD</h1>
          <Dropdown />
        </div>
      </header>
      <main className="dashboard-content">
        <div className="grid-container">
          <ProgressResume />
          <WeeklyRecap />
          <ActualProgress />
          <AddHabits />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;