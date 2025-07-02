import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const CreateBlog = ({ userEmail }) => {
    const navigate = useNavigate();
    const [field, setField] = useState({
        title: '',
        description: '',
        image: '',
        shortDes: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setField((prevField) => ({
            ...prevField,
            [name]: name === 'image' ? URL.createObjectURL(files[0]) : value,
        }));
    };

    const sendBlogToBackend = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', document.querySelector('input[name="image"]').files[0]);
        formData.append('title', field.title);
        formData.append('short_headline', field.shortDes);
        formData.append('description', field.description);

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_REQUEST_API}/api/users/${userEmail}`,
                formData,
                { withCredentials: true }
            );
            navigate('/');
            toast.success("Blog  published successfully!");

        } catch (err) {
            console.error('Cannot send blog data to backend', err);
            toast.error("Failed to publish blog. Please try again.");
        }
    };

    return (
        <section className=" flex items-center justify-center  px-4 py-12">
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 animate-fade-in-up scale-y-70">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 p-5">✍️ Create a New Blog Post</h2>

                <form onSubmit={sendBlogToBackend} className="space-y-6">
                    {/* Image Upload */}
                    <div className="w-full">
                        <label
                            htmlFor="image"
                            className="flex items-center justify-center h-52 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition duration-200 bg-gray-50"
                        >
                            {field.image ? (
                                <img
                                    src={field.image}
                                    alt="Preview"
                                    className="h-full w-full object-cover rounded-xl"
                                />
                            ) : (
                                <span className="text-gray-500 font-medium">Click to Upload Blog Cover Image</span>
                            )}
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            id="image"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Title Input */}
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Blog Title"
                            value={field.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <input
                            type="text"
                            name="shortDes"
                            placeholder="Write a Short Headline (e.g., 10-15 words)"
                            value={field.shortDes}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            name="description"
                            placeholder="Start writing your blog here..."
                            value={field.description}
                            onChange={handleChange}
                            rows="6"
                            required
                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition duration-200 shadow-md"
                    >
                        🚀 Publish Blog
                    </button>
                </form>
            </div>
        </section>
    );
};
CreateBlog.propTypes = {
    userEmail: PropTypes.string
};

export default CreateBlog;
