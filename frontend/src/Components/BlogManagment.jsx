// BlogManagement.js
import { useEffect, useState } from 'react';
import styles from '../styles/BlogManagement.module.css'
import axios from 'axios';

const BlogManagement = () => {
    const [data, setdata] = useState({blogs:[],users:[]});

    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_REQUEST_API}/`);
            if (!response) {
                console.log("Server is unable to send blogs");
            }
            setdata(response.data)
        }
        catch (err) {
            console.log("unable to fetch blogs");
        }
    }
    const toogleBlog = async (blogId) => {
        try{
            const response = await axios.put(`${import.meta.env.VITE_APP_REQUEST_API}/api/v1/admin/blog/toggle/${blogId}`);
           
            setdata(prevdata => {
                const updateBlogs =  prevdata.blogs.map(blog => {
                    if(blog._id == blogId) {
                         return{ ...blog, active: !blog.active }
                    } 
                    return blog;
                })
                return {...prevdata,blogs: updateBlogs}
            })
        }
        catch(err){
            console.log("can;t get blog managment")
            alert("Failed to update blog status. Please try again.");
        }       
        
    }


useEffect(() => {
    fetchBlog()
}, []);

return (
    <div className={styles['blog-management']} style={{width: "100%" ,margin:"auto" , position:"absolute", top:"15%"}} >
        <table width={"100%"} height={"70%"}>
            <thead style={{textAlign:"center"}}>
                <th>Username</th>
                <th>Blog Title</th>
                <th>Blog likes</th>
                <th>Hide blog</th>
            </thead>
            <tbody style={{textAlign:"justify",}}>
                {
                    data.blogs.map(blog => {
                        // console.log("rendering blog ",blog)
                        return (
                            <tr key={blog._id} >
                                <td style={{paddingLeft:"2%"}}>{blog.owner}</td>
                                <td >{blog.title}</td>
                                <td >{blog.likesCount}</td>
                                <td >
                                    <i className= "fa-solid fa-toggle-on" id={blog.id}
                                        style={{ color: blog.active?"green":"black" }}
                                        onClick={()=>toogleBlog(blog._id)}>

                                    </i>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>


    </div>
);
};

export default BlogManagement;
