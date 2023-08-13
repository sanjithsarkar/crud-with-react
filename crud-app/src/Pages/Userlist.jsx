import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    // --------------------- Get all user -----------------------

    const fetchUsers = () => {
        axios.get('http://127.0.0.1:8000/api/users')
        .then((response) => {
            setUsers(response.data.users);
        })

    }


// ------------------ Delete method -------------------------

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then(res => {
                console.log(res.data.users);
                setUsers(users.filter(user => user.id !== id));
            })
            .catch((error) => {
                console.error(error.data);
            })
    };



    return (
        <div>
            {/* <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul> */}
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <Link to="/create/user" className='btn btn-primary'>Create User</Link>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><img src={`http://localhost:8000${user.image_url}`} alt={user.name} width="60px"/></td>
                                    <td>
                                        <Link to={`/user/${user.id}`} className='btn btn-primary me-2'>Edit</Link>
                                        <Link to={`/user/${user.id}`} className='btn btn-success me-2'>Show</Link>
                                        <button onClick={() => handleDelete(user.id)} className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserList;
