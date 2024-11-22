import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="w-full bg-gray-800 p-4 shadow-md relative z-10">
            <div className="container mx-auto flex justify-between items-center text-white">
                {/* Make OmniFlowAI clickable */}
                <Link to="/" className="text-xl font-bold">
                    OmniFlowAI
                </Link>
                <div className="flex space-x-4">
                    <Link to="/login">
                        <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Sign up</button>
                    </Link>
                    <Link to="/users">
                        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Manage users</button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
