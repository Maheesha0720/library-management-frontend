import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/borrow.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import iconRefresh from "../assets/img/iconRefresh.png";


function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [updatedBorrow, setUpdatedBorrow] = useState({
    id: "",
    status: "",
  });

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };
  ///////////////////////////////////////////////////
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
  }, [refresh]);
  ///////////////////////////////////
  const handleInputChange = (e, id) => {
    const { value } = e.target;
    setUpdatedBorrow({ id: id, status: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/borrow/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBorrow),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("status updated successfully:", updatedData);
        // Update the author list after saving
        setBorrows((prevBorrows) =>
          prevBorrows.map((borrow) =>
            borrow.id === updatedData.id ? updatedData : borrow
          )
        );
        setUpdatedBorrow({ id: "", status: "" });
        alert("updated success...");
      } else {
        console.error("Error updating status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="borrows">
      <Navbar />
      <div className="borrow-container" style={{height:"600px"}}>
        <Sidebar />
        <div className="borrow-content">
          <h1>Borrows List </h1>
          <div>
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
                          <>
                            <Form.Select
                              style={{ width: "50px", textAlign: "center" }}
                              name="status"
                              onChange={(e) => handleInputChange(e, borrow.id)}
                              value={
                                updatedBorrow.id === borrow.id
                                  ? updatedBorrow.status
                                  : borrow.status
                              }
                            >
                              <option>borrowed</option>
                              <option>Returned</option>
                            </Form.Select>
                            <Button
                              onClick={handleUpdate}
                              style={{ marginLeft: "10%",backgroundColor:"#28a745",borderColor:"#28a745" }}
                              disabled={updatedBorrow.id !== borrow.id}
                            >
                              Update
                            </Button>
                          </>
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
