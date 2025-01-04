import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/borrow.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Borrows() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [newBorrow, setNewBorrow] = useState({
    bookId: "",
    userId: "",
    status: "",
    borrowDate: "",
    returnDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/getAllUser"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        
      }
    };
    
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/book/getAllBooks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBorrow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBorrow = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/borrow/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBorrow),
      });

      if (response.ok) {
        const addedBorrow = await response.json();
        console.log("Borrow added successfully:", addedBorrow);

        // Update the borrow list with the new author
        setBorrows([...borrows, addedBorrow]);
        setNewBorrow({
          bookId: "",
          userId: "",
          status: "",
          borrowDate: "",
          returnDate: "",
        });
        alert("Borrow added successfully!");
      } else {
        console.error("Error adding borrow:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding borrow:", error);
    }
  };

  return (
    <div className="borrows">
      <Navbar />
      <div className="borrow-container">
        <Sidebar />
        <div className="borrow-content">
          <h1>Borrows </h1>
          <a href="/borrowlist">List of borrows</a>
          <div style={{ marginTop: "50px" }}>
            <div className="borrow-add-form">
              <h3>Borrow a book</h3>

              <div className="form-element">
                <Form.Group
                  as={Col}
                  controlId="formGridState"
                  className="select"
                >
                  <Form.Label>Borrower ID :</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    name="userId"
                    value={newBorrow.userId}
                    onChange={handleInputChange}
                  >
                    <option>Choose...</option>
                    {users.map((user) => (
                      <>
                        <option key={user.userId} value={user.userId}>
                          {user.userId}
                        </option>
                      </>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="form-element">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Book ID :</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    className="select"
                    name="bookId"
                    value={newBorrow.bookId}
                    onChange={handleInputChange}
                  >
                    <option>Choose...</option>
                   
                    {books.map((book) => (
                      <>
                        <option key={book.bookId} value={book.bookId}>
                          {book.bookId}
                        </option>
                        </>
                      ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="form-element">
                <Form.Label>borrow date :</Form.Label>
                <input
                  type="date"
                  name="borrowDate"
                  id=""
                  value={newBorrow.borrowDate}
                  onChange={handleInputChange}
                />
                <Form.Label>Return date:</Form.Label>
                <input
                  type="date"
                  name="returnDate"
                  id=""
                  value={newBorrow.returnDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-element">
                <Form.Group
                  as={Col}
                  controlId="formGridState"
                  className="select"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    defaultValue="choose.."
                    name="status"
                    value={newBorrow.status}
                    onChange={handleInputChange}
                  >
                    <option>choose..</option>
                    <option>borrowed</option>
                    <option>returned</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <button className="btn-save" onClick={handleAddBorrow}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Borrows;
