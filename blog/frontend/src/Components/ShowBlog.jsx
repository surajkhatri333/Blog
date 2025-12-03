import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../Context/LoginContext';

export const ShowBlog = () => {
    const { isLogin, userEmail } = useContext(LoginContext);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [data, setData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [like, setLike] = useState("");
    const [save, setSave] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();


    const handleEditing = () => setIsEditing(true);

    const handleChangeSave = async () => {
        setIsEditing(false);
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/update/${id}`, data);
        } catch (err) {
            console.error("Blog not updated:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // Unified fetching of blog + user + like status
    // useEffect(() => {
    //     const fetchBlogAndUser = async () => {
    //         try {
    //             const blogRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`);
    //             const blogData = blogRes.data;

    //             const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/userid`, { withCredentials: true });
    //             const userId = userRes.data.user;

    //             setData(blogData);
    //             setLike(blogData.like?.includes(userId));
    //         } catch (err) {
    //             console.error("Fetch or Like status error:", err);
    //         }
    //     };

    //     fetchBlogAndUser();
    // }, [id, userEmail, setLike, setSave]);
    useEffect(() => {
        const fetchBlogAndUser = async () => {
            try {
                // Fetch blog always
                const blogRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`);
                const blogData = blogRes.data;

                setData(blogData);

                // If not logged in -> don't check like status
                if (!isLogin) {
                    setLike(false);
                    return;
                }

                // Logged in -> check userId
                const userRes = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/userid`, {
                    withCredentials: true
                });

                const userId = userRes.data.user;
                setCurrentUserId(userId);
                setLike(blogData.likes?.includes(userId));
            } catch (err) {
                console.error("Fetch or Like status error:", err);
            }
        };

        fetchBlogAndUser();
    }, [id, isLogin]);
    console.log(data);

    useEffect(() => {
        const checkIfSaved = async () => {
            if (!userEmail || !isLogin) return;
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/savedBlogs/${userEmail}`);
                if (res?.data?.savedBlogs?.includes(id)) {
                    setSave(true);
                } else {
                    setSave(false);
                }
            } catch (err) {
                console.error("Error checking saved status:", err);
            }
        };
        checkIfSaved();
    }, [userEmail, isLogin, id]);


    const handleStatus = useCallback(async () => {
        try {
            console.log("calling like update api");
            const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/likes/${id}`, {}, { withCredentials: true });
            console.log("calling successfully like api");
            if (response.data) {
                setLike(response.data.liked);
                setData((prevData) => ({
                    ...prevData,
                    likesCount: response.data.likesCount,
                    likes: response.data.likes
                }));

            }
        } catch (err) {
            console.log("Like status error:", err.message);
        }
    }, [id]);

    useEffect(() => {
        const heart = document.querySelector(".fa-heart");
        if (heart) heart.style.color = like ? "red" : "black";
    }, [like]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_REQUEST_API}/delete/${id}`, { withCredentials: true });
            window.location.href = "/";
        } catch (err) {
            console.log("Delete error:", err);
        }
    };


    const handleSave = async () => {
        if (!isLogin) {
            toast.info("Please Login to save Blog");
            return;
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/save/${id}`, { userEmail: userEmail }, { withCredentials: true });
            const savedBlogsId = response.data.savedBlogId;
            const isSaved = savedBlogsId.includes(id);
            setSave(isSaved);
            if (isSaved) {
                toast.success("Blog saved successfully!", { icon: "💾" });
            } else {
                toast.info("Blog removed from saved list!");
            }
        }
        catch (err) {
            console.log("Save error :", err);
            toast.info("Failed to save blog.Pleade try again Later");
        }
    }


    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Blog content */}
                <div className="lg:col-span-2 shadow-md rounded-lg overflow-hidden border">
                    <div className="w-full h-60 sm:h-64 overflow-hidden">
                        <img src={data.image} alt="Blog" className="w-full h-full object-contain" />
                    </div>
                    {/* <span className="relative float-right ">
                        {
                            new Date(data.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        }
                    </span> */}
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

                        <div className="mt-4 flex justify-between items-center space-x-4">
                            <i
                                className={`fa-heart cursor-pointer m-4 transition-transform duration-300 ${like ? 'fa-solid text-red-500 scale-125' : 'fa-regular hover:scale-110'}`}
                                onClick={handleStatus}
                            >
                                {" "}{data.likesCount}
                            </i>

                            {
                                save ?
                                    (<i className="fa-solid fa-bookmark hover:cursor-pointer"
                                        title='Unsave Blog'
                                        onClick={handleSave}>
                                    </i>)
                                    :
                                    (<i
                                        className={"fa-regular fa-bookmark hover:cursor-pointer"}
                                        title='Save Blog'
                                        onClick={handleSave}
                                    />)
                            }
                        </div>

                        {
                            isLogin && currentUserId === data.owner &&
                            <div className="mt-6 flex flex-wrap gap-3">
                                {!isEditing ? <button onClick={handleEditing} className="bg-yellow-400 px-4 py-2 rounded">Edit</button> :
                                    <button onClick={handleChangeSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                                }
                                <button onClick={() => setShowConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </div>
                        }

                        <div className="border-t mt-6 pt-4">
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={handleInputChange}
                                    rows={10}
                                    className="w-full border p-4 rounded text-justify"
                                ></textarea>
                            ) : (
                                <p className="whitespace-pre-wrap text-gray-700">{data.description}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comments section */}
                <div className="shadow-md border rounded-lg p-4">
                    {/* Comment Form */}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const commentInput = e.target.elements.comment;
                            const newComment = commentInput.value.trim();

                            if (!newComment) {
                                alert("Comment cannot be empty!");
                                return;
                            }
                            try {
                                const response = await axios.post(
                                    `${import.meta.env.VITE_APP_REQUEST_API}/comments/${id}`,
                                    { comment: newComment, userEmail: userEmail },
                                    { withCredentials: true }
                                );
                                console.log("Comment response:", response.data);
                                const newCommentObj = response.data.newComments;

                                setData((prev) => ({
                                    ...prev,
                                    comments: [...(prev.comments || {}), newCommentObj],
                                }));

                                commentInput.value = "";
                            } catch (err) {
                                console.error("Comment error:", err);
                                alert("Failed to post comment. Make sure you're logged in.");
                            }
                        }}
                    >
                        <input
                            name="comment"
                            placeholder="Add a public comment..."
                            className="w-full border p-2 rounded"
                        />
                        <button
                            type="submit"
                            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Comment
                        </button>
                    </form>

                    {/* Comment List */}
                    <div className="mt-6">
                        {data.comments?.length > 0 ? (
                            <ul className="space-y-4">
                                {data.comments.map((comm, index) => (
                                    <li key={index} className="flex space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                                        <div>
                                            <div className="font-semibold" onClick={() => navigate(`/userProfile/${comm.user.email}`)}>
                                                {comm.user?.username || comm.user?.email || `User ${index + 1}`}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(comm.createdAt).toLocaleString()}
                                            </div>
                                            <div className="mt-1">{comm.comment}</div>
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
