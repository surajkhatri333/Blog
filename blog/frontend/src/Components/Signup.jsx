import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [name, setname] = useState('');
    const {email} = useParams();
    const [password, setpassword] = useState('');
    const [profileAvatar, setprofileAvatar] = useState('');
    const navigate = useNavigate();

    const handleImage = (e) => {
        const image = e.target.files[0];
        if (image && image.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(image);
            setprofileAvatar(imageUrl);
        } else {
            alert("Please upload a valid image file.");
        }
    };


    const handleSignup = async (e) => {
        e.preventDefault();

        const imageFile = document.getElementById('image').files[0];
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", "User");
        formData.append("profileAvatar", imageFile); // actual image file

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_REQUEST_API}/api/v1/user/register`,
                formData, { withcredentials: true }
            );
            toast.success("Signup successful! Please login.");
            navigate("/login");
        } catch (err) {
            console.error("Error handling signup:", err);
            toast.error("Signup failed. Please try again.");
        }
    };
    return (
        <form onSubmit={handleSignup} className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">SIGNUP FORM</h2>

                <div className="mb-4 text-center">
                    <label htmlFor="image" className="cursor-pointer block">
                        {profileAvatar ? (
                            <img src={profileAvatar} alt="Preview" className="w-24 h-24 rounded-full mx-auto object-cover" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                <span className="text-gray-500">Upload</span>
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="profileAvatar"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        readOnly
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
