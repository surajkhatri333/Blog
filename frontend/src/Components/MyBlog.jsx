
import axios from 'axios'
import style from '../styles/MyBlog.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import propTypes from 'prop-types'


export const MyBlogs = ({userEmail}) => {
    const { user, isAuthenticated } = useAuth0();
    const [data, setdata] = useState([]);
    console.log(userEmail)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/MyBlogs/${userEmail}`);

                setdata(response.data);
            }
            catch (err) {
                console.log(`error fetching data : ${err}`);
            }

        };
        fetchdata();

    }, [isAuthenticated, user])




    return (
        <>
            <div className={style.MyBlogContainer}>
                {
                    data.map((blog) => {
                        return (
                            <>
                                <div className={style.myBlog} key={blog._id}>
                                    <div className={style.myBlogContent}>
                                        <div className={style.myImage}>
                                            <img src={`http://localhost:8080/${blog.image}`} alt="" width={"70%"} height={"90%"} />
                                        </div>
                                        <div className={style.detail}>
                                            <div className={style.title}>Title : {blog.title}</div>
                                            <div className={style.short_headline}>Short_description : {blog.short_headline}</div>
                                            
                                        </div>


                                       
                                    </div>
                                    <div className={style.button}>
                                        <button className={style.edit}>EDIT</button>
                                        <button className={style.delete}>DELETE</button>
                                        <button className={style.view}><Link to={`/show/${blog._id}`}>view Blog</Link></button>
                                    </div>
                                </div>
                            </>
                        )


                    })
                }

            </div>
        </>
    )
}

MyBlogs.propTypes = {
    userEmail : propTypes.string.isRequired
}


