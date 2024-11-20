import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa'; // Import envelope icon

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Email cannot be empty');
            return;
        }

        // Placeholder for actual forgot password logic
        setMessage('If an account with this email exists, you will receive a password reset link.');
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            {/* Home Button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
                Home
            </button>

            <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-10 py-12">
                <h1 className="text-3xl font-bold text-center text-black mb-10">Forgot Password</h1>
                <form onSubmit={handleForgotPassword}>
                    {/* Email Field */}
                    <div className="mb-8">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 py-2 border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white text-lg bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg hover:from-blue-500 hover:to-purple-600"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className="mt-6 text-center text-sm text-green-600">{message}</p>}

                <div className="mt-28 text-center">
                    <p className="text-sm text-gray-600">
                        Remembered your password?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-purple-500 hover:underline cursor-pointer"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
