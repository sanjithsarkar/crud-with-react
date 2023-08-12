import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const CreateUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const clearFields = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleCreate = () => {
        axios.post('http://127.0.0.1:8000/api/users', { name, email, password })
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
                        <label className="form-label">Email address</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                    </div>


                    <button onClick={handleCreate} className='btn btn-success me-4'>Create User</button>
                    <Link to="/" className='btn btn-primary'>Back to User</Link>
                </div>

            </div>
        </div>
    );
};

export default CreateUser;