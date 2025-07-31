import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/users';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {
        const res = await axios.get(API);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API}/${editingId}`, { name, email });
            setEditingId(null);
        } else {
            await axios.post(API, { name, email });
        }
        setName('');
        setEmail('');
        fetchUsers();
    };

    const handleEdit = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <h3>Users</h3>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="btn btn-primary">
                    {editingId ? 'Update' : 'Add'} User
                </button>
            </form>

            <table className="table">
                <thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}