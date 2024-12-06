
import { useParams } from 'react-router-dom';
import styles from '../styles/ShowBlog.module.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const ShowBlog = () => {
    const [data, setData] = useState([]);
    const [isEditing, setisEditing] = useState(false);
    const [like, setLike] = useState(false);
    const { id } = useParams();

    // Toggle editing mode
    const handleEditing = () => setisEditing(true);

    // Save changes
    const handleChangeSave = async () => {
        setisEditing(false);
        try {
            await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/update/${id}`, data);
            console.log("Blog updated successfully");
        } catch (err) {
            console.log("Blog not updated:", err);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Check if the current user has liked the blog initially
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const res = await axios.get("${import.meta.env.VITE_APP_REQUEST_API}/userid", { withCredentials: true });
                const userId = res.data.user;

                if (data.like && data.like.includes(userId)) {
                    setLike(true);
                }
            } catch (err) {
                console.log("Error fetching like status:", err);
            }
        };

        checkLikeStatus();
    }, [data.like]);

    // Handle like/dislike toggle
    const handleStatus = useCallback(async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/likes/${id}`, {}, { withCredentials: true });
            if (response.data) {
                setLike((prev) => !prev);  // Toggle the like state
                setData((prevData) => ({
                    ...prevData,
                    likesCount: like ? prevData.likesCount - 1 : prevData.likesCount + 1,
                }));
            }
            console.log(response.data)
        } catch (err) {
            console.log("Error updating like status:", err);
        }
    }, [id, like]);

    // Update heart icon color based on like status
    useEffect(() => {
        document.getElementsByClassName("fa-heart")[0].style.color = like ? "red" : "black";
    }, [like]);

    // Fetch blog data from backend
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/show/${id}`);
                setData(response.data);
            } catch (err) {
                console.log(`Cannot fetch blog data with ID: ${id}`, err);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <>
            <div className={styles.showBlogContainer}>
                <div className={styles.blogContainer}>
                    <div id={styles.blogContainer1}>
                        <div className={styles.blogContents}>
                            <div className={styles.image}>
                                <img src={`${import.meta.env.VITE_APP_REQUEST_API}/${data.image}`} alt="" width="100%" height="300px" />
                                <div className={styles.fields}>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="short_headline"
                                                value={data.short_headline}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h2>{data.title}</h2>
                                            <p>{data.short_headline}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.blogContents} id={styles.likesComments}>
                                <i className="fa-regular fa-heart" name="likesCount" onClick={handleStatus}> {data.likesCount}</i>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={handleEditing}>Edit</button>
                                <button>Delete</button>
                                <button onClick={handleChangeSave}>Save</button>
                            </div>
                        </div>

                        {/* <div className={styles.blogContents} id={styles.likesComments}>
                            <i className="fa-regular fa-comment" name="comments">{data.comments?data.comments.length : 0} </i>
                            <input id={styles.commentBox} type="text" name='allComments' />
                            <div id="commentsList">
                                <ul>
                                    {data.comments.map((comm) => {
                                        return (
                                            <>
                                                <li>{comm}</li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div> */}


                        <div className={styles.blogContents} id={styles.likesComments}>
                            <i className="fa-regular fa-comment" name="comments">
                                {data.comments ? data.comments.length : 0} Comments
                            </i>
                            <input id={styles.commentBox} type="text" name="allComments" placeholder="Add a public comment..." />
                            <div id="commentsList">
                                <ul>
                                    {data.comments?.map((comm, index) => (
                                        <li key={index}>
                                            <div className="comment-avatar"></div> {/* Placeholder for avatar */}
                                            <div className={styles["comment-content"]}>
                                                <div className={styles["comment-author"]}>User {index + 1}</div> {/* Placeholder name */}
                                                <div className={styles["comment-text"]}>{comm}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>



                    </div>

                    <div className={styles.blogContents} id={styles.blogContainer2}>
                        {isEditing ? (
                            <textarea name="description" value={data.description} onChange={handleInputChange} rows={17}></textarea>
                        ) : (
                            <textarea value={data.description} readOnly rows={17}></textarea>
                        )}
                    </div>



                </div>

            </div>
            
        </>
    );
};


