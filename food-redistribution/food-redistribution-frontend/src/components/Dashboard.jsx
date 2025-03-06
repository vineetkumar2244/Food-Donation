import Navbar from "./Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <h1>Welcome to the Food Redistribution Platform</h1>
                <p>Helping reduce food waste by connecting donors with NGOs.</p>
            </div>
        </div>
    );
};

export default Dashboard;
