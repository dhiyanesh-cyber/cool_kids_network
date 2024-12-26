// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import authService from '../../services/authService';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="sticky top-0 z-50 bg-dark-card bg-opacity-70 backdrop-blur-lg text-white p-4 shadow-md border-b border-dark-border">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" id='brand' className="text-2xl font-bold flex items-center">
                    Cool Kids Network
                </Link>
                <ul className="flex space-x-4 items-center">
                    {!user ? (
                        <>
                            <li>
                                <Link to="/signup" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                                    <FaUserPlus className="mr-2" /> Signup
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                                    <FaSignInAlt className="mr-2" /> Login
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {
                                !authService.isMaintainer() ?
                                    <li>
                                        <Link to="/profile" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                                            <FaUser className="mr-2" /> Profile
                                        </Link>
                                    </li>
                                    :
                                    <li>
                                        <Link to="/update-role" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                                            <FaUser className="mr-2" /> Update Role
                                        </Link>
                                    </li>
                            }

                            {(user.role === 'Cooler Kid' || user.role === 'Coolest Kid' || authService.isMaintainer()) && (
                                <li>
                                    <Link to="/users" className="flex items-center hover:bg-dark-hover px-3 py-2 rounded transition">
                                        <FaUsers className="mr-2" /> User List
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button onClick={onLogout} className="flex items-center hover:bg-red-600 px-3 py-2 rounded transition">
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;