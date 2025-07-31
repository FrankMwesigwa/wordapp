import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/activities';

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);

    const fetchActivities = async () => {
        const res = await axios.get(API);
        setActivities(res.data);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API}/${editingId}`, { title, description });
            setEditingId(null);
        } else {
            await axios.post(API, { title, description });
        }
        setTitle('');
        setDescription('');
        fetchActivities();
    };

    const handleEdit = (activity) => {
        setTitle(activity.title);
        setDescription(activity.description);
        setEditingId(activity.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        fetchActivities();
    };

    return (
        <div>
            <h3>Activities</h3>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button className="btn btn-primary">
                    {editingId ? 'Update' : 'Add'} Activity
                </button>
            </form>

            <table className="table">
                <thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>
                    {activities.map(activity => (
                        <tr key={activity.id}>
                            <td>{activity.title}</td>
                            <td>{activity.description}</td>
                            <td>
                                <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(activity)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(activity.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}