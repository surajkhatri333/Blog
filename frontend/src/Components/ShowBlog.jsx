import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const ShowBlog = () => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [like, setLike] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams();

    const handleEditing = () => setIsEditing(true);

    const handleChangeSave = async () => {
        setIsEditing(false);
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/update/${id}`, data);
        } catch (err) {
            console.log("Blog not updated:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const res = await axios.get("${import.meta.env.VITE_APP_REQUEST_API}/userid", { withCredentials: true });
                const userId = res.data.user;
                if (data.like?.includes(userId)) setLike(true);
            } catch (err) {
                console.log("Like status error:", err);
            }
        };
        checkLikeStatus();
    }, [data.like]);

    const handleStatus = useCallback(async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/likes/${id}`, {}, { withCredentials: true });
            if (response.data) {
                setLike((prev) => !prev);
                setData((prevData) => ({
                    ...prevData,
                    likesCount: like ? prevData.likesCount - 1 : prevData.likesCount + 1,
                }));
            }
        } catch (err) {
            console.log("Like status error:", err);
        }
    }, [id, like]);

    useEffect(() => {
        const heart = document.querySelector(".fa-heart");
        if (heart) heart.style.color = like ? "red" : "black";
    }, [like]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`);
                setData(response.data);
            } catch (err) {
                console.log("Fetch blog error:", err);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_REQUEST_API}/delete/${id}`, { withCredentials: true });
            window.location.href = "/";
        } catch (err) {
            console.log("Delete error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Blog content section */}
                <div className="lg:col-span-2 shadow-md rounded-lg overflow-hidden border">
                    <div className="w-full h-60 sm:h-64 overflow-hidden">
                        <img src={`${import.meta.env.VITE_APP_REQUEST_API}/${data.image}`} alt="Blog" className="w-full h-full object-contain" />
                    </div>

                    <div className="p-4 sm:p-6">
                        {isEditing ? (
                            <>
                                <input name="title" value={data.title} onChange={handleInputChange} className="w-full text-2xl font-bold border-b border-gray-300 mb-2" />
                                <input name="short_headline" value={data.short_headline} onChange={handleInputChange} className="w-full text-lg border-b border-gray-200" />
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold p-2">{data.title}</h2>
                                <p className="text-gray-600 mt-2">{data.short_headline}</p>
                            </>
                        )}

                        <div className="mt-4 flex items-center space-x-4">
                            <i
                                className={`fa-regular fa-heart cursor-pointer transition-transform m-4 duration-300 ${like ? 'scale-125 text-red-500' : 'hover:scale-110'}`}
                                onClick={handleStatus}
                            > {data.likesCount}</i>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button onClick={handleEditing} className="bg-yellow-400 px-4 py-2 rounded">Edit</button>
                            <button onClick={() => setShowConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button onClick={handleChangeSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        </div>

                        <div className="border-t mt-6 pt-4">
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={handleInputChange}
                                    rows={10}
                                    className="w-full border p-4 rounded"
                                ></textarea>
                            ) : (
                                <p className="whitespace-pre-wrap text-gray-700">{data.description}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="shadow-md border rounded-lg p-4">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const commentInput = e.target.elements.comment;
                            const newComment = commentInput.value.trim();
                            if (!newComment) return alert("Comment cannot be empty!");
                            try {
                                const response = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/comments/${id}`, { comment: newComment }, { withCredentials: true });
                                setData((prev) => ({
                                    ...prev,
                                    comments: [...prev.comments, response.data.newComment],
                                }));
                                commentInput.value = "";
                            } catch (err) {
                                console.log("Comment error:", err);
                            }
                        }}
                    >
                        <input
                            name="comment"
                            placeholder="Add a public comment..."
                            className="w-full border p-2 rounded"
                        />
                        <button type="submit" className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded">
                            Comment
                        </button>
                    </form>

                    <div className="mt-6">
                        {data.comments?.length > 0 ? (
                            <ul className="space-y-4">
                                {data.comments.map((comm, index) => (
                                    <li key={index} className="flex space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <div className="font-semibold">User {index + 1}</div>
                                            <div>{comm}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border rounded">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
