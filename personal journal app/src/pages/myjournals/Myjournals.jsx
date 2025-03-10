import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'

const MyJournals = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/journals")
      .then((response) => response.json())
      .then((data) => setJournals(data))
      .catch((error) => console.error("Error fetching journals:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/journals/${id}`, { method: "DELETE" })
      .then(() => {
        setJournals(journals.filter((journal) => journal.id !== id));
      })
      .catch((error) => console.error("Error deleting journal:", error));
  }; 

  return (
    <div style={{margin: "0px"}}>
    <Navbar />
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        marginTop:"13vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
    
      <h2 style={{ fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
        My Journals
      </h2>

    
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button style={addButtonStyle} onClick={() => navigate("/new-journal")}>
          Add New Journal
        </button>
      </div>

      {journals.length === 0 ? (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h4 style={{ fontFamily: "Poppins, sans-serif" }}>
            No journals found. Start creating a journal now!
          </h4>
        </div>
      ) : (
        <div>
          {journals.map((journal) => (
            <div key={journal.id} style={rowStyle}>
              <div style={{ flex: "3", textAlign: "left" }}>
                <h3>{journal.title}</h3>
                <p>
                  <small>
                    {new Date(journal.created_at).toLocaleDateString()}
                  </small>
                </p>
                <p>
                  {journal.content.length > 100
                    ? `${journal.content.substring(0, 100)}...`
                    : journal.content}
                </p>
              </div>

              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() =>
                    navigate("/new-journal", {
                      state: { journal, viewMode: true },
                    })
                  }
                  style={buttonStyle("#007bff")}
                >
                  View
                </button>
                <button
                  onClick={() =>
                    navigate("/new-journal", {
                      state: { journal, viewMode: false },
                    })
                  }
                  style={buttonStyle("#28a745")}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(journal.id)}
                  style={buttonStyle("#dc3545")}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
    <div style={footerStyle}>
        <h3>Keep Your Memories Alive</h3>
        <p>
          Journaling helps you reflect, grow, and cherish every special moment
          in life.
        </p>
      </div></div>
  );
};

// Styles
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  padding: "15px",
  borderRadius: "10px",
  margin: "10px 0",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
};

const buttonStyle = (color) => ({
  padding: "7px 15px",
  backgroundColor: color,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

const addButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff7043",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
};

const footerStyle = {
  marginTop: "opx",
  padding: "20px",
  background: "#fff5e1",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
};

export default MyJournals;
