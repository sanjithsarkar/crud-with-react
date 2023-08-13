// HomePage.js
import React, { useEffect } from 'react';
import axios from 'axios';
import UserList from './Userlist';

const HomePage = () => {
    // const [users, setUsers] = useState('');
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://127.0.0.1:8000/api/users')
    };


    return (
        <div>
            <h1 className='d-flex justify-content-center'>User Management</h1>

            <UserList />


        </div>
    );
};

export default HomePage;
