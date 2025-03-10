import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editjournal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [journal, setJournal] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/journals/${id}`)
      .then(response => response.json())
      .then(data => setJournal(data))
      .catch(error => console.error('Error fetching journal:', error));
  }, [id]);

  const handleChange = (e) => {
    setJournal({ ...journal, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/journals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(journal),
    })
      .then(response => response.json())
      .then(() => navigate('/myjournals'))
      .catch(error => console.error('Error updating journal:', error));
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Journal</h2>
      <input
        type="text"
        name="title"
        value={journal.title}
        onChange={handleChange}
        placeholder="Enter Title"
        style={inputStyle}
      />
      <textarea
        name="content"
        value={journal.content}
        onChange={handleChange}
        placeholder="Write your journal here..."
        rows="8"
        style={textareaStyle}
      ></textarea>
      <div style={buttonContainer}>
        <button onClick={handleSave} style={buttonStyle("#28a745")}>Save Changes</button>
        <button onClick={() => navigate('/myjournals')} style={buttonStyle("#dc3545")}>Cancel</button>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center'
};

const headingStyle = {
  fontFamily: 'Poppins, sans-serif',
  marginBottom: '20px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px'
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px'
};

const buttonContainer = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px'
};

const buttonStyle = (color) => ({
  padding: '10px 15px',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
});

export default Editjournal;
