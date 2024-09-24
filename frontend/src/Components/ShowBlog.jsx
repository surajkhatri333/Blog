import { useParams} from 'react-router-dom';
import styles from '../styles/ShowBlog.module.css'
// import blogsPost from './blogPost.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
export const ShowBlog = () => {
    const [data,setData] = useState([]);
    const { id } = useParams();
    // let blog = blogsPost.find((blogs) => blogs.id.toString() === id);
    // if(!blog){
    //     console.log("blog not found");
    // }


    //fetch data from bakcend

    useEffect(()=>{
        const fetchBlog = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8080/show/${id}`)
                setData(response.data);
            }
            catch(err){
                console.log(`Cannot fetch blog data have is :{id}`,err);
            }
        };
        fetchBlog();
    },[id])

    
    return (

        <>
            <div className={styles.showBlogContainer} >
                <div className={styles.blogContainer}>
                    <div className={styles.blogContents} id={styles.blogContainer1}>
                        <div className={styles.image}>
                            <img src={`http://localhost:8080/${data.image}`} alt="" width={'100%'} height={"70%"} />
                            <div className={styles.fields}>
                                <h2>{data.title}</h2>
                                <p>{data.short_headline}</p>
                            </div>

                        </div>
                        <div className={styles.buttons}>
                            <button>Edit</button>
                            <button>Delete</button>
                            <button>Save</button>
                        </div>

                    </div>

                    <div className={styles.blogContents} id={styles.blogContainer2}>
                        <textarea value={data.description} ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}
