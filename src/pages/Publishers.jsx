import React, { useState, useEffect } from 'react';
import '../assets/css/publisher.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import iconRefresh from '../assets/img/iconRefresh.png';


function Publishers() {
   const [publishers, setpublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newpublisher, setNewpublisher] = useState({ publisherName: '' });
    const [refresh, setRefresh] = useState(false);
    const [editpublisher, setEditpublisher] = useState(null); 
    const [updatedpublisher, setUpdatedpublisher] = useState({
      publisherId: '',
      publisherName: ''
  });
    const refreshPage = () => {
      setRefresh((prev) => !prev);
    };
        // get All publishers for the table
    useEffect(() => {
      const fetchpublisher = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/publisher/getAllPublisher');
          if (!response.ok) {
            throw new Error('Failed to fetch publishers');
          }
          const data = await response.json();
          setpublishers(data);
        } catch (error) {
          console.error('Error fetching publisher:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchpublisher();
    }, [refresh]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;  
      setNewpublisher({ publisherName: value });
      setUpdatedpublisher((prevState) => ({
        ...prevState,
        [name]: value
      }));
      
    };
    // Handle publisher editing
  const handleEdit = (publisher) => {
    setEditpublisher(publisher);
    setUpdatedpublisher({
      publisherId: publisher.publisherId,
      publisherName: publisher.publisherName
    });
  };

  // Handle save of updated user data
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/publisher/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedpublisher),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('publisher updated successfully:', updatedData);
        // Update the publisher list after saving
        setpublishers(publishers.map((publisher) => (publisher.publisherId === updatedData.publisherId ? updatedData : publisher)));
        setEditpublisher(null);
        setUpdatedpublisher({
        });
      } else {
        console.error('Error updating publisher:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating publisher:', error);
    }
  };
    // Add publishers
    const handleAddpublisher = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/publisher/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newpublisher),
        });
    
        if (response.ok) {
          const addedpublisher = await response.json();
          console.log('publisher added successfully:', addedpublisher);
    
          // Update the publishers list with the new publisher
          setpublishers([...publishers, addedpublisher]);
          setNewpublisher({ publisherName: '' }); // Reset input field
        } else {
          console.error('Error adding publisher:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding publisher:', error);
      }
    }; 
       
    // Delete publishers 
    const handleDelete = async (publisherId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this publisher?');
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:8080/api/publisher/delete/${publisherId}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setpublishers(publishers.filter((publisher) => publisher.publisherId !== publisherId));  // Remove deleted  from the state
            console.log('publisher deleted successfully');
          } else {
            console.error('Error deleting publisher:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting publisher:', error);
        }
      }
    };
   
  return (
    <div className="publisher">
      <Navbar />
      <div className="publisher-container">
        <Sidebar />
        <div className="publisher-content">
          <h1>Publisher</h1>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-add">
            {showAddForm ? 'Cancel' : ' Add publisher '}
          </button>

          {showAddForm && (
            <div className="add-publisher-form">
              <h3>Add New publisher</h3>
              <input
              type="text"
              name="publisherName"
              value={newpublisher.publisherName}
              onChange={handleInputChange}
                placeholder="Enter name"

              />
              <button onClick={handleAddpublisher} className="btn-save">Save</button>
            </div>
          )}

          <div>
          <button onClick={refreshPage} className="btn-refresh"><img src={iconRefresh} alt="."  style={{width:"20px"}}/> Refresh Data</button>

          </div>
          
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table border="1" width="100%" className="publisher-table">
                <thead>
                  <tr>
                    <th className="table-head">publisher ID</th>
                    <th className="table-head">Name</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {publishers.map((publisher) => (
                    <tr 
                     key={publisher.publisherId}
                    >
                      <td className="publisher-data">{publisher.publisherId}</td>
                      <td className="publisher-data">{publisher.publisherName}</td>
                      <td className="publisher-data">
                        <button
                          className="btn-edit"  
                          onClick={() => handleEdit(publisher)}>
                          Edit
                        </button>
                        <button className="btn-delete" onClick={()=>handleDelete(publisher.publisherId)}
                        >Delete</button>
                      </td>
                    </tr>
                  ))} 
                </tbody>
              </table>
              
              {editpublisher && (
                <div className="edit-publisher-form">
                  <h2>Edit publisher</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        name="publisherName"
                        value={updatedpublisher.publisherName}
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
                        onClick={() => setEditpublisher(null)}
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
}

export default Publishers ;
