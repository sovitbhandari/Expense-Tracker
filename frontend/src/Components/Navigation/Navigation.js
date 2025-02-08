import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserPreferences } from '../../redux/actions/authActions';
import { signout, burgerIcon, signinIcon } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import maleIcon from '../../img/male.png';
import femaleIcon from '../../img/female.png';
import SignInForm from '../Auth/SignInUp';

const Navigation = ({ active, setActive }) => {
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    
    const { userPreferences, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsProfileModalOpen(false);
                setIsSignInModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full bg-black flex justify-between items-center p-4 shadow-lg z-50">
            {/* User Info */}
            <div className="flex items-center gap-3">
                <img
                    src={userPreferences.avatar === 'male' ? maleIcon : femaleIcon}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="text-white">
                    <h2 className="text-wheat font-bold">{userPreferences.name}</h2>
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Mobile Burger Icon */}
            <div 
                className="text-white text-2xl cursor-pointer md:hidden transition-transform duration-300"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {burgerIcon}
            </div>

            {/* Navigation Menu */}
            <ul 
                className={`md:flex gap-6 absolute md:relative bg-black w-full md:w-auto left-0 md:top-0 top-16 p-4 md:p-0 
                transition-transform duration-300 ${menuOpen ? 'block' : 'hidden'}`}
            >
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={`flex flex-col items-center text-wheat cursor-pointer p-2 hover:text-white transition 
                        ${active === item.id ? 'text-white' : ''}`}
                    >
                        {item.icon}
                        <span className="text-sm">{item.title}</span>
                    </li>
                ))}

                {isAuthenticated ? (
                    <li onClick={() => dispatch(logoutUser())} className="flex flex-col items-center text-red-500 cursor-pointer p-2 hover:text-red-700">
                        {signout}
                        <span className="text-sm">Sign Out</span>
                    </li>
                ) : (
                    <li onClick={() => setIsSignInModalOpen(true)} className="flex flex-col items-center text-wheat cursor-pointer p-2 hover:text-white">
                        {signinIcon}
                        <span className="text-sm">Sign In</span>
                    </li>
                )}
            </ul>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
                    <div className="bg-gradient-to-b from-[#652931] to-[#F2994A] p-6 rounded-lg text-center relative">
                        <button className="absolute top-3 right-3 text-white text-xl" onClick={() => setIsProfileModalOpen(false)}>✕</button>
                        <h2 className="text-white text-xl font-bold">Edit Profile</h2>

                        <label className="block mt-4 text-white">
                            Name:
                            <input
                                type="text"
                                value={userPreferences.name}
                                onChange={(e) => dispatch(updateUserPreferences({ name: e.target.value }))}
                                className="w-full p-2 mt-2 rounded-lg border border-gray-300 text-black"
                            />
                        </label>

                        <label className="block mt-4 text-white">
                            Avatar:
                            <select
                                value={userPreferences.avatar}
                                onChange={(e) => dispatch(updateUserPreferences({ avatar: e.target.value }))}
                                className="w-full p-2 mt-2 rounded-lg border border-gray-300 text-black"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>

                        <button
                            className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                            onClick={() => {
                                dispatch(updateUserPreferences(userPreferences));
                                setIsProfileModalOpen(false);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Sign-In Modal */}
            {isSignInModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
                    <div className="bg-gradient-to-b from-[#652931] to-[#F2994A] p-6 rounded-lg text-center relative">
                        <button className="absolute top-3 right-3 text-white text-xl" onClick={() => setIsSignInModalOpen(false)}>✕</button>
                        <h2 className="text-white text-xl font-bold">Sign In</h2>
                        <SignInForm />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navigation;
