import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import ForgotPassword from './Forgotpassword';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to OmniFlowAI</h1>
            <div className="flex space-x-4">
                <Link to="/signup">
                    <button className="px-6 py-3 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 shadow-lg">
                        Go to Signup
                    </button>
                </Link>

                <Link to="/login">
                    <button className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg">
                        Go to Login
                    </button>
                </Link>

                <Link to="/users">
                    <button className="px-6 py-3 text-white font-semibold bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg">
                        Manage Users
                    </button>
                </Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/users" element={<Users />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
