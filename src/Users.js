import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users.');
        }
    };

    // Delete a user by ID
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    // Generate a new user
    const generateUser = async () => {
        try {
            const response = await axios.post('http://localhost:3001/users');
            setUsers([...users, response.data]);
        } catch (err) {
            setError('Failed to generate user.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Back to Home Button */}
            <Link to="/">
                <button className="absolute top-5 left-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Back to Home
                </button>
            </Link>

            {/* User Management Section */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-5">User Management</h1>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    className="mb-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={generateUser}
                >
                    Generate New User
                </button>
                <table className="table-auto border-collapse border border-gray-400 w-3/4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">ID</th>
                        <th className="border border-gray-400 px-4 py-2">Username</th>
                        <th className="border border-gray-400 px-4 py-2">Password</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.password}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email || 'N/A'}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
