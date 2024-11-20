import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

function Login() {
    const [identifier, setIdentifier] = useState(''); // Can be username or email
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Success or error
    const [loginFailed, setLoginFailed] = useState(false); // Track login failure
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            setMessage('Username/Email and password cannot be empty');
            setMessageType('error');
            setLoginFailed(false); // No failure for empty fields
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', {
                identifier,
                password,
            });
            setMessage(response.data.message);
            setMessageType('success');
            setLoginFailed(false); // Reset login failure on success
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error logging in');
            setMessageType('error');
            setLoginFailed(true); // Mark login as failed
        }
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
                <h1 className="text-3xl font-bold text-center text-black mb-10">Login</h1>
                <form onSubmit={handleLogin}>
                    {/* Identifier Section (Email/Username) */}
                    <div className="mb-6">
                        <label
                            htmlFor="identifier"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Username or Email
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                id="identifier"
                                placeholder="Type your username or email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full pl-10 py-2 border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                id="password"
                                placeholder="Type your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 py-2 border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none"
                            />
                        </div>

                        {loginFailed && (
                            <div className="text-right mt-2">
                                <Link
                                    to="/forgotpassword"
                                    className="text-sm text-purple-500 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white text-lg bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg hover:from-blue-500 hover:to-purple-600"
                    >
                        LOGIN
                    </button>
                </form>

                {message && (
                    <p
                        className={`mt-6 text-center text-sm ${
                            messageType === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {message}
                    </p>
                )}

                {/* Social Media Login */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 mb-4">Or Login Using</p>
                    <div className="flex justify-center gap-4">
                        <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
                            <FaFacebookF />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500">
                            <FaTwitter />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600">
                            <FaGoogle />
                        </button>
                    </div>
                </div>

                <div className="mt-28 text-center">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-purple-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
