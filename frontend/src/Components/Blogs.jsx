
import styles from '../styles/Blogs.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Blogs = () => {
    const [blogVisible, setblogVisible] = useState(10);
    const [data, setData] = useState({ blogs: [], users: [] });
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const loadblog = () => {
        setblogVisible(prevblog => prevblog + 10);
        console.log(blogVisible);
    }

    //request for blog data from backend
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                console.log(`${import.meta.env.VITE_APP_REQUEST_API}/`)
                const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/`,{ withCredentials: true});
                const { blogs, users } = response.data;
                console.log(response.data)
                // Filter blogs based on banned status of users
                const activeUsers = users.filter(user => !user.ban);
                const activeUseremail = new Set(activeUsers.map(user => user.email));

                const nonBannedBlogs = blogs.filter(blog => activeUseremail.has(blog.owner));
                console.log(nonBannedBlogs)
                setData({ blogs, users });
                setFilteredBlogs(nonBannedBlogs);
                console.log(filteredBlogs)
            }
            catch (err) {
                console.log("cannot get blog data from backend", err);

            }
        };
        fetchBlog();
    }, [])


    return (
        <>
            <div className={styles.blogContainer} >
                {
                    filteredBlogs.filter(blog => blog.active == true).slice(0,blogVisible).map((blog) => {
                    
                            return (

                                <>
                                    <div className={styles.card} key={blog._id}>
                                        <img src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`} className="cardImage" alt="..." style={{ width: '100%', height: '100%', boxSizing: "border-box", objectFit: "cover" }} />
                                        <div className={styles['card-body']}>
                                            <h5 className={styles['card-title']}>{blog.title}</h5>
                                            <p className={styles['card-text']}>{blog.short_headline}</p>

                                            <Link to={`/show/${blog._id}`} style={{ color: "#E67E22" }} >View Blog</Link>

                                        </div>
                                    </div>

                                </>

                            )
                    })


                }
                <div className={styles.moreBlog}>
                    <button style={{ fontSize: "1vw" }} onClick={loadblog}>More Blogs</button>

                </div>

            </div>
        </>
        
        // <>
        //     <div className={styles.blogContainer}>
        //         {filteredBlogs.slice(0, blogVisible).map((blog) => (
        //             <div className={styles.card} key={blog._id}>
        //                 <img
        //                     src={`${import.meta.env.VITE_APP_REQUEST_API}/${blog.image}`}
        //                     className={styles.cardImage}
        //                     alt={blog.title}
        //                 />
        //                 <div className={styles['card-body']}>
        //                     <h5 className={styles['card-title']}>{blog.title}</h5>
        //                     <p className={styles['card-text']}>{blog.short_headline}</p>
        //                     <Link to={`/show/${blog._id}`} className={styles.viewLink}>
        //                         View Blog
        //                     </Link>
        //                 </div>
        //             </div>
        //         ))}

        //         <div className={styles.moreBlog}>
        //             <button onClick={loadblog}>More Blogs</button>
        //         </div>
        //     </div>

        // </>
    )
}

export default Blogs