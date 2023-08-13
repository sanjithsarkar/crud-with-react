import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [image_url, setImage_url] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchUsers();
    });


    // --------------------- get user data by id -----------------------

    const fetchUsers = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((response) => {
                const userData = response.data.user; // Assuming your API response format
                console.log(userData);
                setName(userData.name);
                setEmail(userData.email);
                setImage_url(userData.image_url);
            })

    }


    // --------------------- Image read image by FormData ------------------------

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            // Display the selected image as a preview
            const imageURL = URL.createObjectURL(selectedImage);
            setPreviewImage(imageURL); 
            setImage(selectedImage);
        }
    };


    // ------------------- update function user data -----------------------

    const handleUpdate = (e) => {

        e.preventDefault();

        // ---------------- only image send by FormData -------------------

        const formData = new FormData();
        formData.append('image', image);
        formData.append('_method', 'PUT')

        console.log(formData)
        const userData = { name, email };


        // -------------------- axios type post when data update with image  ----------------------

        axios.post(`http://127.0.0.1:8000/api/users/${id}`, formData, {
            params: userData
        }) // Use put for updating
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1 className='d-flex justify-content-center'>User Management</h1>

            <form onSubmit={handleUpdate} enctype="multipart/form-data">
                <div className='row d-flex justify-content-center'>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        
                    </div> */}

                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                            <img src={!previewImage ? `http://localhost:8000${image_url}` : previewImage} className='mt-3' alt="Preview" width="60px" />
                            {/* <img src={`http://localhost:8000${image_url}`}  width="60px"/> */}
                        </div>


                        <button type='submit' className='btn btn-success me-4'>Update User</button>
                        <Link to="/" className='btn btn-primary'>Back to Users</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
