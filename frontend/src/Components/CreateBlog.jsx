//  //first component
// import { useState } from 'react'
// import styles from '../styles/CreateBlog.module.css'
// import { useAuth0 } from '@auth0/auth0-react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'


// const CreateBlog = () => {
//     const { user } = useAuth0();
//     const [field, setfield] = useState({
//         title: "",
//         description: "",
//         image: "",
//         shortDes: ""
//     });
//     // const handleChange = () => {
//     //     document.getElementsByTagName("button").addEventListener(onclick,()=>{
//     //         setfield((e) => e.target.value);
//     //     })

//     // }
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setfield((prevField) => ({
//             ...prevField,
//             [name]: name === 'image' ? URL.createObjectURL(files[0]) : value
//         }));
//     };


//     // send blog to backend
//     const sendBlogToBackend = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("owner", user.email);
//         formData.append("image", document.querySelector('input[name="image"]').files[0]); // Get the file directly
//         formData.append("title", field.title);
//         formData.append("short_headline", field.shortDes);
//         formData.append("description", field.description);

//         try {
//             const response = await axios.post(`http://localhost:8080/api/users/${user.email}`, formData
//                 // {
//                 //     method: "POST",
//                 //     headers: {
//                 //         'Content-Type': 'application/json',
//                 //     },
//                 //     body: JSON.stringify(formData)
//                 // }
//             );
//             console.log(response)
//             console.log("blog data send to backend")
//             return response;
//         }
//         catch (err) {
//             console.log("Cannot send blog data to backend", err);
//         }
//     }
//     return (
//         <>
//             <div className={styles.container}>
//                 <div className={styles.blogContainer}>
//                     <form onSubmit={sendBlogToBackend}>
//                         <div id={styles.blogContainer1}>
//                             <div className={styles.blogContent} id={styles.blogContent1}>

//                                 {/* <div className={styles.imageBox}> */}
//                                 <img src={field.image} alt="" width={"100%"} height={"100%"} />
//                                 {/* </div> */}


//                             </div>
//                             <input type="file" accept='image/*' name='image' onChange={handleChange} />
//                             <div className={styles.blogContent} id={styles.blogContent2}>
//                                 <div className={styles.blogField}>
//                                     <input type="text"
//                                         className='title' placeholder='Enter your blog ittle'
//                                         name='title' value={field.title} onChange={handleChange} />
//                                 </div>
//                                 <div className={styles.blogField}>
//                                     <input type="text" placeholder='Enter your short description' name='shortDes' value={field.shortDes} onChange={handleChange} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles.description}>
//                             <div className={styles.describe}>
//                                 <textarea
//                                     name="description"
//                                     placeholder='Enter Blog Description'
//                                     value={field.description}
//                                     onChange={handleChange}>

//                                 </textarea>
//                             </div>
                            
//                                 <button type="submit"><Link to= '/'>SUBMIT</Link></button>
                            


//                         </div>
//                     </form>


//                 </div>

//             </div>
//         </>
//     )
// }

// export default CreateBlog
 
  




// //second component
// import { useState } from 'react';
// import styles from '../styles/CreateBlog.module.css';
// import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const CreateBlog = () => {
//     const { user } = useAuth0();
//     const [field, setfield] = useState({
//         title: '',
//         description: '',
//         image: '',
//         short_headline: ''
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setfield((prevField) => ({
//             ...prevField,
//             [name]: name === 'image' ? URL.createObjectURL(files[0]) : value
//         }));
//     };

//     const sendBlogToBackend = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('owner', user.email);
//         formData.append('image', document.querySelector('input[name="image"]').files[0]);
//         formData.append('title', field.title);
//         formData.append('short_headline', field.short_headline);
//         formData.append('description', field.description);

//         try {
//             const response = await axios.post(`http://localhost:8080/api/users/${user.email}`, formData);
//             setfield(response.data);
//             console.log('Blog data sent to backend', response);
//         } catch (err) {
//             console.log('Cannot send blog data to backend', err);
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.card}>
//                 <form onSubmit={sendBlogToBackend}>
//                     <h2 className={styles.title}>Create Your Blog</h2>

//                     <div className={styles.imageUpload}>
//                         <label htmlFor="image" className={styles.fileLabel}>
//                             {field.image ? <img src={field.image} alt="Preview" className={styles.imagePreview} width={"30%"} height={"10%"}/> : 'Upload an Image'}
//                         </label>
//                         <input type="file" name="image" accept="image/*" id="image" className={styles.fileInput} onChange={handleChange} />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Blog Title"
//                             value={field.title}
//                             onChange={handleChange}
//                             className={styles.inputField}
//                         />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <input
//                             type="text"
//                             name="shortDes"
//                             placeholder="Short Description"
//                             value={field.short_headline}
//                             onChange={handleChange}
//                             className={styles.inputField}
//                         />
//                     </div>

//                     <div className={styles.formGroup}>
//                         <textarea
//                             name="description"
//                             placeholder="Write your blog here..."
//                             value={field.description}
//                             onChange={handleChange}
//                             className={styles.textArea}
//                         />
//                     </div>

//                     <button type="submit" className={styles.submitButton}>
//                         <Link to="/">Submit Blog</Link>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateBlog;



//third component

import { useState } from 'react';
import styles from '../styles/CreateBlog.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateBlog = () => {
    const { user } = useAuth0();
    const [field, setfield] = useState({
        title: '',
        description: '',
        image: '',
        shortDes: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setfield((prevField) => ({
            ...prevField,
            [name]: name === 'image' ? URL.createObjectURL(files[0]) : value
        }));
    };

    const sendBlogToBackend = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('owner', user.email);
        formData.append('image', document.querySelector('input[name="image"]').files[0]);
        formData.append('title', field.title);
        formData.append('short_headline', field.shortDes);
        formData.append('description', field.description);

        try {
            const response = await axios.post(`http://localhost:8080/api/users/${user.email}`, formData);
            console.log('Blog data sent to backend', response);
        } catch (err) {
            console.log('Cannot send blog data to backend', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Create Your Blog</h2>
                <form onSubmit={sendBlogToBackend}>
                    <div className={styles.imageUpload}>
                        <label htmlFor="image" className={styles.fileLabel}>
                            {field.image ? <img src={field.image} alt="Preview" className={styles.imagePreview} /> : 'Upload an Image'}
                        </label>
                        <input type="file" name="image" accept="image/*" id="image" className={styles.fileInput} onChange={handleChange} />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Blog Title"
                            value={field.title}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="shortDes"
                            placeholder="Short Description"
                            value={field.shortDes}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <textarea
                            name="description"
                            placeholder="Write your blog here..."
                            value={field.description}
                            onChange={handleChange}
                            className={styles.textArea}
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Submit Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;

