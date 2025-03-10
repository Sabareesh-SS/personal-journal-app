import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const NewJournal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [journal, setJournal] = useState({
    id: null,
    title: '',
    content: '',
    image: null,
  });

  const [font, setFont] = useState('Roboto, sans-serif');
  const [isViewMode, setIsViewMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Load existing journal if editing or viewing
  useEffect(() => {
    if (location.state?.journal) {
      setJournal(location.state.journal);
      setIsViewMode(location.state.viewMode || false);
    }
  }, [location.state]);

  const handleChange = (e) => {
    if (!isViewMode) {
      setJournal({ ...journal, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = (event) => {
    if (!isViewMode) {
      const file = event.target.files[0];
      if (file) {
        setJournal({ ...journal, image: URL.createObjectURL(file) });
      }
    }
  };

  const handleSaveJournal = async () => {
    if (!journal.title || !journal.content) {
      setSnackbar({ open: true, message: "Title and content cannot be empty!" });
      return;
    }

    const url = journal.id 
      ? `http://localhost:8000/api/journals/${journal.id}`
      : 'http://localhost:8000/api/journals';
    const method = journal.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journal),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: journal.id ? 'Journal updated successfully!' : 'Journal saved successfully!' });
        setTimeout(() => navigate('/myjournals'), 2000);
      } else {
        setSnackbar({ open: true, message: 'Failed to save journal.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'Error saving journal.' });
    }
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '40px auto', 
      padding: '30px', 
      borderRadius: '12px', 
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
      backgroundColor: '#f5f7fa'
    }}>
      <h2 style={{ textAlign: 'center', fontWeight: '700', color: '#2c3e50', fontSize: '24px' }}>
        {isViewMode ? 'View Journal' : journal.id ? 'Edit Journal' : 'Create a New Journal'}
      </h2>

      <select 
        onChange={(e) => setFont(e.target.value)} 
        style={{ marginBottom: '15px', padding: '8px', borderRadius: '8px', fontSize: '14px' }}
        disabled={isViewMode}
      >
        <option value="Roboto, sans-serif">Roboto</option>
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="Courier New, monospace">Courier New</option>
        <option value="Times New Roman, serif">Times New Roman</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="Tahoma, sans-serif">Tahoma</option>
        <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
      </select>

      <input 
        type="text" 
        name="title"
        placeholder="Journal Title" 
        value={journal.title} 
        onChange={handleChange} 
        style={{ 
          width: '96%', 
          padding: '12px', 
          marginBottom: '15px', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          fontSize: '16px',
          backgroundColor: isViewMode ? '#e9ecef' : '#ffffff',
          color: '#34495e',
          fontFamily: font
        }}
        readOnly={isViewMode}
      />

      <textarea 
        name="content"
        placeholder="Write your journal here..." 
        value={journal.content} 
        onChange={handleChange} 
        style={{ 
          width: '96%', 
          height: '200px', 
          padding: '12px', 
          marginBottom: '15px', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          fontSize: '16px',
          backgroundColor: isViewMode ? '#e9ecef' : '#ffffff',
          color: '#34495e',
          fontFamily: font
        }}
        readOnly={isViewMode}
      ></textarea>

      <div>
        <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#2c3e50' }}>
          Upload Image:
        </label>
        <input type="file" onChange={handleImageUpload} style={{ marginBottom: '15px', padding: '5px' }} disabled={isViewMode} />
        {journal.image && (
          <img 
            src={journal.image} 
            alt="Journal" 
            style={{ 
              width: '100%', 
              marginTop: '10px', 
              borderRadius: '10px', 
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' 
            }} 
          />
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        {!isViewMode && (
          <button 
            onClick={handleSaveJournal}
            style={buttonStyle("#28a745")}
          >
            {journal.id ? 'Update Journal' : 'Save Journal'}
          </button>
        )}
        
        <button 
          onClick={() => navigate('/myjournals')}
          style={buttonStyle("#dc3545")}
        >
          Cancel
        </button>
      </div>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbar({ ...snackbar, open: false })}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

const buttonStyle = (color) => ({
  padding: '12px 15px',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  margin: '5px',
  transition: 'background 0.3s'
});

export default NewJournal;
