
import styles from '../styles/Blogs.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ApiError } from '../../../Backend/public/src/utils/ApiError'


const Blogs = () => {
    const [blogVisible, setblogVisible] = useState(10);
    const [data, setData] = useState([]);

    const loadblog = () => {
        setblogVisible(prevblog => prevblog + 10);
        console.log(blogVisible);
    }

    //request for blog data from backend
    useEffect(() => {
        const fetchBlog = async (req, res) => {
            try {
                const response = await axios.get("http://localhost:8080/");
                setData(response.data);
            }
            catch (err) {
                console.log("cannot get blog data from backend", err);
                return res.status(400).json(new ApiError(400, "Unable to fetch blog data"));
            }
        };
        fetchBlog();
    }, [])
    

    return (
        <>
            <div className={styles.blogContainer} >
                {
                    data.map((blog) => {
                        return (

                            <>
                                <div  className={styles.card} key={blog._id}>
                                    <img src={`http://localhost:8080/${blog.image}`} className="cardImage" alt="..." style={{ width: '100%', height: '30%', boxSizing: "border-box", objectFit: "cover" }} />
                                    <div className={styles['card-body']}>
                                        <h5 className={styles['card-title']}>{blog.title}</h5>
                                        <p className={styles['card-text']}>{blog.short_headline}</p>

                                        <Link to={`/show/${blog._id}`} style={{color:"#E67E22"}} >View Blog</Link> 

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
    )
}

export default Blogs