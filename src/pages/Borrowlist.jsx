import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/borrow.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusOptions] = useState(["Borrowed", "Returned"]);
  const [editBorrow, setEditBorrow] = useState(null);
  const [updatedBorrow, setUpdatedBorrow] = useState({
    id: "",
    status: "",
  });
  const [selectedBorrowId, setSelectedBorrowId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchBorrow = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/borrow/getAllBorrows"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch borrows");
        }
        const data = await response.json();
        setBorrows(data);
      } catch (error) {
        console.error("Error fetching borrows:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBorrow();
  }, []);
  ///////////////////////////////////
  const handleInputChange = (e, borrowId) => {
    const { value } = e.target;
    setSelectedBorrowId(borrowId); // Set the selected borrowId
    setSelectedStatus(value); // Set the selected status
  };

  // Handle author editing
  
  const handleStatusChange = async () => {
    if (!selectedBorrowId || !selectedStatus) {
      alert('Please select a status to update.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/borrow/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          borrowId: selectedBorrowId,
          status: selectedStatus,
        }),
      });
  
      if (response.ok) {
        let updatedData = null;
  
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          updatedData = await response.json();
        }
  
        console.log('Borrow updated successfully:', updatedData);
  
        setBorrows((prevBorrows) =>
          prevBorrows.map((borrow) =>
            borrow.id === selectedBorrowId ? { ...borrow, status: selectedStatus } : borrow
          )
        );
  
        setSelectedBorrowId(null);
        setSelectedStatus('');
        alert('Status updated successfully!');
      } else {
        console.error('Error updating borrow:', response.statusText);
        alert('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating borrow:', error);
      alert('An error occurred while updating status.');
    }
  };
  

  return (
    <div className="borrows">
      <Navbar />
      <div className="borrow-container">
        <Sidebar />
        <div className="borrow-content">
          <h1>Borrows List </h1>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table border="1" width="100%" className="borrowlist-table">
                  <thead>
                    <tr>
                      <th className="table-head">Borrow ID</th>
                      <th className="table-head">Book</th>
                      <th className="table-head">Borrower</th>
                      <th className="table-head">Borrow Date</th>
                      <th className="table-head">Return Date</th>
                      <th className="table-head">Status</th>
                      <th className="table-head" style={{ minWidth: "200px" }}>
                        Change Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrows.map((borrow) => (
                      <tr key={borrow.id}>
                        <td className="borrowlist-data">{borrow.id}</td>
                        <td className="borrowlist-data">
                          {borrow.book.bookTitle}
                        </td>
                        <td className="borrowlist-data">{borrow.user.name}</td>
                        <td className="borrowlist-data">{borrow.borrowDate}</td>
                        <td className="borrowlist-data">{borrow.returnDate}</td>
                        <td className="borrowlist-data">{borrow.status}</td>
                        <td
                          className="borrowlist-data"
                          style={{ display: "flex" }}
                        >
                          <Form.Select
                            style={{ width: "50px", textAlign: "center" }}
                            value={
                              selectedBorrowId === borrow.id
                                ? selectedStatus
                                : borrow.status
                            }
                            name="status"
                            onChange={(e) => handleInputChange(e, borrow.id)}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </Form.Select>
                          <Button
                            style={{ marginLeft: "10%" }}
                            onClick={handleStatusChange}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Borrows;
