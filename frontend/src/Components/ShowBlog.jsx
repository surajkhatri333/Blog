import { useParams } from 'react-router-dom';
import styles from '../styles/ShowBlog.module.css'
import { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
// import { fetchBlog } from '../Services/api';
export const ShowBlog = () => {
    const [data, setData] = useState([]);
    const [isEditing, setisEditing] = useState(false);
    const[like,setLike] = useState(false);
    const { id } = useParams();

    //handel the input for heading and short description

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    //toggel editing buton
    const handleEditing = () => {
        setisEditing(true);
    }

    //SAVE CHANGES
    const handleChangeSave = async () => {
        setisEditing(false);
        try {
            await axios.put(`http://localhost:8080/update/${id}`, data);
            console.log("Blog is updated successfully");
        }
        catch (err) {
            console.log("Blog is not updataed :", err);
        }
    }

    //update like and comments
    const handleStatus = useCallback(async()=>{
        try{
            const blog = await axios.put(`http://localhost:8080/likes/${id}`,{},{withCredentials:true});
            console.log(blog)
            if(!blog){
                console.log("something server problem");
            }
            if(document.getElementsByClassName("fa-heart")[0].style.color == "black"){
                document.getElementsByClassName("fa-heart")[0].style.color = "red";
            }
            else{
                document.getElementsByClassName("fa-heart")[0].style.color = "black"
            }
        }
        catch(err){
            console.log("likes is not update",err);
        }
    })

    
    //fetch data from bakcend

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/show/${id}`)
                setData(response.data);
            }
            catch (err) {
                console.log(`Cannot fetch blog data have is :{id}`, err);
            }
        };
        fetchBlog();
    }, [id,handleStatus]
);


    return (

        <>
            <div className={styles.showBlogContainer} >
                <div className={styles.blogContainer}>
                    <div id={styles.blogContainer1}>
                        <div className={styles.blogContents}>
                            <div className={styles.image}>
                                <img src={`http://localhost:8080/${data.image}`} alt="" width={'100%'} height={"300px"} />
                                <div className={styles.fields}>
                                    {
                                        isEditing ?
                                            <>
                                                <input type='text'
                                                    name='title'
                                                    value={data.title}
                                                    onChange={handleInputChange}
                                                />
                                                <input type='text'
                                                    name='short_headline'
                                                    value={data.short_headline}
                                                    onChange={handleInputChange}
                                                />

                                            </>
                                            :
                                            <>
                                                <h2>{data.title}</h2>
                                                <p>{data.short_headline}</p>
                                            </>

                                    }
                                </div>

                            </div>
                            <div className={styles.blogContents} id={styles.likesComments}>
                                <i className="fa-regular fa-heart" name="likesCount" onClick={handleStatus} >  {data.likesCount}</i>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={handleEditing}>Edit</button>
                                <button>Delete</button>
                                <button onClick={handleChangeSave}>Save</button>
                            </div>
                        </div>

                        <div className={styles.blogContents} id={styles.likesComments}>
                            <i className="fa-regular fa-comment"name="comments" ></i>{data.comments}
                        </div>
                    </div>

                    <div className={styles.blogContents} id={styles.blogContainer2}>
                        {
                            isEditing ?
                                <textarea name="description" value={data.description} onChange={handleInputChange} rows={17} ></textarea>
                                : <textarea value={data.description} readOnly rows={17}></textarea>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
