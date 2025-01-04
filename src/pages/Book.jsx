import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import '../assets/css/book.css'

function Book() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({
    bookId: "",
    bookTitle: "",
    authorId: "",
    publisherId:"",
    
  }); 
  const [showAddForm, setShowAddForm] = useState(false); // Show Add Form
  const [newBook, setNewBook] = useState({
    bookTitle: "",
    authorId: "",
    publisherId: ""
  });

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
         } 
       };
       
       fetchBooks();
     }, []);
     ////////////////////////////////////////
     const handleEditClick = (book) => {
      setEditBook(book.bookId);
      setUpdatedBook({
        bookId: book.bookId,
    bookTitle: book.bookTitle,
    authorId: book.authorId,
    publisherId:book.publisherId,
      });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedBook((prev) => ({
        ...prev,
        [name]: value,
      }));
      setNewBook((prev) => ({ ...prev, [name]: value }));
    };

  const handleUpdateBook = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/book/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === updatedData.id ? updatedData : book
          )
        );
        setEditBook(null); // Close the form after saving
        setUpdatedBook({  bookId: "",
          bookTitle: "",
          authorId: "",
          publisherId:"" });
        alert("Book updated successfully!");
      } else {
        console.error("Error updating book:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
  const handleCancelEdit = () => {
    setEditBook(null);
    setUpdatedBook({ bookId: "",
      bookTitle: "",
      authorId: "",
      publisherId:""});
  };
  ///////////////////////////////////////////////
  const handleAddBook = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/book/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });

      if (response.ok) {
        const addedBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, addedBook]);
        setShowAddForm(false); // Hide the Add Form
        setNewBook({ bookTitle: "", authorId: "", publisherId: "" });
        alert("Book added successfully!");
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewBook({ bookTitle: "", authorId: "", publisherId: "" });
  };
  /////////////////////////////////////////////

  return (
    <div className="book">
      <Navbar />
      <div className="book-container">
        <Sidebar />
        <div className="book-content">
          <h1>Book Store</h1>
          <Button 
            style={{ marginBottom: "20px", backgroundColor: "green", borderColor: "green" }} 
            onClick={() => setShowAddForm(true)}
          >
            Add New Book
          </Button>
           {/* Add Book Form */}
           {showAddForm && (
            <div className="add-form-overlay">
              <div className="add-form">
                <h2>Add Book</h2>
                <label>Title:</label>
                <input
                  type="text"
                  name="bookTitle"
                  value={newBook.bookTitle}
                  onChange={handleInputChange}
                />
                <label>Author:</label>
                <input
                  type="text"
                  name="authorId"
                  value={newBook.authorId}
                  onChange={handleInputChange}
                />
                <label>Publisher:</label>
                <input
                  type="text"
                  name="publisherId"
                  value={newBook.publisherId}
                  onChange={handleInputChange}
                />
                <div className="form-buttons">
                  <button onClick={handleAddBook}>Save</button>
                  <button onClick={handleCancelAdd}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <Row xs={1} md={4} className="g-4">
      {books.map((book)=>(
        <Col >
        <Card key={book.bookId} className="book-card" >

          <Card.Body>
            <Card.Title>{book.bookTitle}</Card.Title>
            <Card.Text>
              Book ID :{book.bookId} <br />
              Author : {book.author.authorName}
              <br />
              Publisher :{book.publisher.publisherName}
            </Card.Text>
            <Button style={{width:"60px",height:"35px",margin:"5px",backgroundColor:"gold",borderColor:"gold"}}
            onClick={()=>handleEditClick(book)}>
              Edit
            </Button>
            <Button style={{width:"80px",height:"35px",margin:"5px",backgroundColor:"red",borderColor:"red"}}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
      ))}
  </Row>
  {editBook && (
        <div className="edit-form-overlay">
          <div className="edit-form">
            <h2>Edit Book</h2>
            <label>Title:</label>
            <input
              type="text"
              name="bookTitle"
              value={updatedBook.bookTitle}
              onChange={handleInputChange}
            />
            <label>Author:</label>
            <input
              type="text"
              name="authorId"
              value={updatedBook.authorId}
              onChange={handleInputChange}
            />
            <label>Category:</label>
            <input
              type="text"
              name="publisherId"
              value={updatedBook.publisherId}
              onChange={handleInputChange}
            />
            <div className="edit-form-buttons">
              <button onClick={handleUpdateBook}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default Book;
