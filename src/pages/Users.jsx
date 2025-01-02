import React, { useState, useEffect } from 'react';
import '../assets/css/user.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); 
  const [updatedUser, setUpdatedUser] = useState({
    userId: '',
    name: '',
    email: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/getAllUser');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user editing
  const handleEdit = (user) => {
    setEditUser(user);
    setUpdatedUser({
      userId: user.userId,
      name: user.name,
      email: user.email
    });
  };

  // Handle save of updated user data
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('User updated successfully:', updatedData);
        // Update the users list after saving
        setUsers(users.map((user) => (user.userId === updatedData.userId ? updatedData : user)));
        setEditUser(null);
        setUpdatedUser({
        });
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle input change for the updated user data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setNewUser({ ...newUser, [name]: value });
  };
  //delete.........
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/delete/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter((user) => user.userId !== userId));  // Remove deleted user from the state
          console.log('User deleted successfully');
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  // Add a new user
  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]); // Update UI with new user
      setShowAddForm(false); // Hide form
      setNewUser({ name: '', email: '' }); // Clear form
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="users">
      <Navbar />
      <div className="user-container">
        <Sidebar />
        <div className="user-content">
          <h1>Our Users</h1>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-add">
            {showAddForm ? 'Cancel' : ' Add User '}
          </button>

          {showAddForm && (
            <div className="add-user-form">
              <h3>Add New User</h3>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={newUser.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={handleInputChange}
              />
              <button onClick={handleAddUser} className="btn-save">Save</button>
            </div>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table border="1" width="100%" className="user-table">
                <thead>
                  <tr>
                    <th className="table-head">User ID</th>
                    <th className="table-head">Name</th>
                    <th className="table-head">Email</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.userId}>
                      <td className="user-data">{user.userId}</td>
                      <td className="user-data">{user.name}</td>
                      <td className="user-data">{user.email}</td>
                      <td className="user-data">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button className="btn-delete" onClick={()=>handleDelete(user.userId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {editUser && (
                <div className="edit-user-form">
                  <h2>Edit User</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn-save"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setEditUser(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
