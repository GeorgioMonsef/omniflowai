// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import ForgotPassword from './Forgotpassword';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Header will always be displayed */}
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                    </Routes>
                </main>
                {/* Footer will always be displayed */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
