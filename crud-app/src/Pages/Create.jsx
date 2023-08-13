import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const CreateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const clearFields = () => {
        setName('');
        setEmail('');
        setPassword('');
        setImage(null);
    };


    //----------   display image  ----------------

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            // Display the selected image as a preview
            const imageURL = URL.createObjectURL(selectedImage);
            setPreviewImage(imageURL);
            setImage(selectedImage);
        }
    };


    // ----------------- Insert data ------------------

    const handleCreate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        const userData = { name, email, password };
        axios.post('http://127.0.0.1:8000/api/users', formData,{
            params: userData
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    clearFields();
                    navigate('/');
                }

            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('Error:', error);
                }
            });
    };

    return (
        <div>
            <h1 className='d-flex justify-content-center'>User Management</h1>

            {/* {errors && Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )} */}


            <div className='row d-flex justify-content-center'>
                <div className='col-md-6'>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors && errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors && errors.email && <div className="alert alert-danger">{errors.email[0]}</div>}
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors && errors.password && <div className="alert alert-danger">{errors.password[0]}</div>}
                    </div>

                    {/* <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {errors && errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}
                    </div> */}

                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                        {previewImage && <img src={previewImage} className='mt-3' alt="Preview" width="60px" />}
                    </div>





                    <button onClick={handleCreate} className='btn btn-success me-4'>Create User</button>
                    <Link to="/" className='btn btn-primary'>Back to User</Link>
                </div>

            </div>
        </div>
    );
};

export default CreateUser;