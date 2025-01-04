import React, { useState, useEffect } from "react";
import "../assets/css/author.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import iconRefresh from "../assets/img/iconRefresh.png";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ authorName: "" });
  const [refresh, setRefresh] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);
  const [updatedAuthor, setUpdatedAuthor] = useState({
    authorId: "",
    authorName: "",
  });
  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };
  // get All authors for the table
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/author/getAllAuthor"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor({ authorName: value });
    setUpdatedAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Handle author editing
  const handleEdit = (author) => {
    setEditAuthor(author);
    setUpdatedAuthor({
      authorId: author.authorId,
      authorName: author.authorName,
    });
  };

  // Handle save of updated user data
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/author/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAuthor),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Author updated successfully:", updatedData);
        // Update the author list after saving
        setAuthors(
          authors.map((author) =>
            author.authorId === updatedData.authorId ? updatedData : author
          )
        );
        setEditAuthor(null);
        setUpdatedAuthor({});
      } else {
        console.error("Error updating author:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };
  // Add authors
  const handleAddAuthor = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/author/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        const addedAuthor = await response.json();
        console.log("Author added successfully:", addedAuthor);

        // Update the authors list with the new author
        setAuthors([...authors, addedAuthor]);
        setNewAuthor({ authorName: "" });
      } else {
        console.error("Error adding author:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  // Delete Authors
  const handleDelete = async (authorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this author?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/author/delete/${authorId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setAuthors(authors.filter((author) => author.authorId !== authorId)); // Remove deleted  from the state
          console.log("author deleted successfully");
        } else {
          console.error("Error deleting author:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting author:", error);
      }
    }
  };

  return (
    <div className="authors">
      <Navbar />
      <div className="author-container">
        <Sidebar />
        <div className="author-content">
          <h1>Authors</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-add"
          >
            {showAddForm ? "Cancel" : " Add Author "}
          </button>

          {showAddForm && (
            <div className="add-author-form">
              <h3>Add New Author</h3>
              <input
                type="text"
                name="authorName"
                value={newAuthor.authorName}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <button onClick={handleAddAuthor} className="btn-save">
                Save
              </button>
            </div>
          )}

          <div>
            <button onClick={refreshPage} className="btn-refresh">
              <img src={iconRefresh} alt="." style={{ width: "20px" }} />{" "}
              Refresh Data
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table border="1" width="100%" className="author-table">
                <thead>
                  <tr>
                    <th className="table-head">Author ID</th>
                    <th className="table-head">Name</th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author) => (
                    <tr key={author.authorId}>
                      <td className="author-data">{author.authorId}</td>
                      <td className="author-data">{author.authorName}</td>
                      <td className="author-data">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(author)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(author.authorId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {editAuthor && (
                <div className="edit-author-form">
                  <h2>Edit Author</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        name="authorName"
                        value={updatedAuthor.authorName}
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
                        onClick={() => setEditAuthor(null)}
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

export default Authors;
