// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';

// const CreateBlog = ({ userEmail }) => {
//     const navigate = useNavigate();
//     const [field, setField] = useState({
//         title: '',
//         description: '',
//         image: '',
//         shortDes: '',
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setField((prevField) => ({
//             ...prevField,
//             [name]: name === 'image' ? URL.createObjectURL(files[0]) : value,
//         }));
//     };

//     const sendBlogToBackend = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('image', document.querySelector('input[name="image"]').files[0]);
//         formData.append('title', field.title);
//         formData.append('short_headline', field.shortDes);
//         formData.append('description', field.description);

//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_APP_REQUEST_API}/api/users/${userEmail}`,
//                 formData,
//                 { withCredentials: true }
//             );
//             navigate('/');
//             toast.success("Blog  published successfully!");

//         } catch (err) {
//             console.error('Cannot send blog data to backend', err);
//             toast.error("Failed to publish blog. Please try again.");
//         }
//     };

//     return (

//         <section className=" flex items-center justify-center  px-4 py-12">
//             <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 animate-fade-in-up scale-y-70">
//                 <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 p-5">✍️ Create a New Blog Post</h2>

//                 <form onSubmit={sendBlogToBackend} className="space-y-6">
//                     {/* Image Upload */}
//                     <div className="w-full">
//                         <label
//                             htmlFor="image"
//                             className="flex items-center justify-center h-52 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition duration-200 bg-gray-50"
//                         >
//                             {field.image ? (
//                                 <img
//                                     src={field.image}
//                                     alt="Preview"
//                                     className="h-full w-full object-contain rounded-xl"
//                                 />
//                             ) : (
//                                 <span className="text-gray-500 font-medium">Click to Upload Blog Cover Image</span>
//                             )}
//                         </label>
//                         <input
//                             type="file"
//                             name="image"
//                             accept="image/*"
//                             id="image"
//                             className="hidden"
//                             onChange={handleChange}
//                         />
//                     </div>

//                     {/* Title Input */}
//                     <div>
//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Enter Blog Title"
//                             value={field.title}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                         />
//                     </div>

//                     {/* Short Description */}
//                     <div>
//                         <input
//                             type="text"
//                             name="shortDes"
//                             placeholder="Write a Short Headline (e.g., 10-15 words)"
//                             value={field.shortDes}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                         />
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <textarea
//                             name="description"
//                             placeholder="Start writing your blog here..."
//                             value={field.description}
//                             onChange={handleChange}
//                             rows="6"
//                             required
//                             className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
//                         ></textarea>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition duration-200 shadow-md"
//                     >
//                         🚀 Publish Blog
//                     </button>
//                 </form>
//             </div>
//         </section>

//     );
// };
// CreateBlog.propTypes = {
//     userEmail: PropTypes.string
// };

// export default CreateBlog;






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
        imageFile: null,   // actual file
        imagePreview: '',  // preview URL
        shortDes: '',
        category: '',
        tags: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            const file = files[0];
            setField((prev) => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            }));
        } else {
            setField((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const sendBlogToBackend = async (e) => {
        e.preventDefault();

        if (!field.imageFile) {
            toast.error("Please upload a blog cover image!");
            return;
        }

        const formData = new FormData();
        formData.append('image', field.imageFile);
        formData.append('title', field.title);
        formData.append('short_headline', field.shortDes);
        formData.append('description', field.description);
        formData.append('category', field.category);
        formData.append('tags', field.tags);

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_REQUEST_API}/api/users/${userEmail}`,
                formData,
                { withCredentials: true }
            );
            navigate('/');
            toast.success("Blog published successfully!");
        } catch (err) {
            console.error('Cannot send blog data to backend', err);
            toast.error("Failed to publish blog. Please try again.");
        }
    };

    return (
        <section className="flex items-center justify-center px-6 py-12 mt-20 mb-20">
            <div className="w-full max-w-9xl relative top-10 bg-white shadow-xl rounded-2xl p-10">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10 p-5">
                     Create a New Blog Post
                </h2>

                <form onSubmit={sendBlogToBackend} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Image Upload */}
                    <div>
                        <label
                            htmlFor="image"
                            className="flex items-center justify-center h-60 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition duration-200 bg-gray-50"
                        >
                            {field.imagePreview ? (
                                <img
                                    src={field.imagePreview}
                                    alt="Preview"
                                    className="h-full w-full object-contain rounded-xl"
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

                    {/* Right Side - Blog Info */}
                    <div className="space-y-6">
                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Blog Title"
                            value={field.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Short Headline */}
                        <input
                            type="text"
                            name="shortDes"
                            placeholder="Write a Short Headline (e.g., 10-15 words)"
                            value={field.shortDes}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Category */}
                        <select
                            name="category"
                            value={field.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="AI">Artificial Intelligence</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="health">Health</option>
                            <option value="food">Food</option>
                        </select>

                        {/* Tags */}
                        <input
                            type="text"
                            name="tags"
                            placeholder="Add tags (comma separated, e.g., AI, React, Node)"
                            value={field.tags}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Full Width - Description */}
                    <div className="lg:col-span-2">
                        <textarea
                            name="description"
                            placeholder="Start writing your blog here..."
                            value={field.description}
                            onChange={handleChange}
                            rows="8"
                            required
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="lg:col-span-2 text-center">
                        <button
                            type="submit"
                            className="w-50  py-3 bg-gradient-to-r bg-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition duration-200 shadow-md"
                        >
                             Publish Blog
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

CreateBlog.propTypes = {
    userEmail: PropTypes.string,
};

export default CreateBlog;
