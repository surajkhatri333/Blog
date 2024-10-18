import { useState } from 'react';
import styles from '../styles/CreateBlog.module.css';
import axios from 'axios';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
 const CreateBlog = ({userEmail}) => {
    const  Navigate = useNavigate();
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
        // formData.append('owner', userEmail);
        formData.append('image', document.querySelector('input[name="image"]').files[0]);
        formData.append('title', field.title);
        formData.append('short_headline', field.shortDes);
        formData.append('description', field.description);

        try {
            const response = await axios.post(`http://localhost:8080/api/users/${userEmail}`, formData);
            console.log('Blog data sent to backend', response);
            console.log(`http://localhost:8080/api/users/${userEmail}`)
            Navigate("/")
        } catch (err) {
            console.log('Cannot send blog data to backend', err);
            console.log(`http://localhost:8080/api/users/${userEmail}`)
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

CreateBlog.propTypes = {
    userEmail : propTypes.string.isRequired
}

