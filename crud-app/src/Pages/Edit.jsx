import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchUsers();
    }, [id]);

    const fetchUsers = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((response) => {
                const userData = response.data.user; // Assuming your API response format
                console.log(userData);
                setName(userData.name);
                setEmail(userData.email);
            })

    }

    const clearFields = () => {
        setName('');
        setEmail('');
    };

    const handleUpdate = () => {
        axios.put(`http://127.0.0.1:8000/api/users/${id}`, { name, email }) // Use put for updating
            .then(() => {
                clearFields();
                navigate('/');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1 className='d-flex justify-content-center'>User Management</h1>

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

                    <button onClick={handleUpdate} className='btn btn-success me-4'>Update User</button>
                    <Link to="/" className='btn btn-primary'>Back to Users</Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
