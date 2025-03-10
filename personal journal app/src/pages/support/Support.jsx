import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar'

const SupportCard = styled(Paper)({
  padding: '30px',
  textAlign: 'center',
  borderRadius: '20px',
  boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
  background: 'linear-gradient(to right, #fcb69f, #ffecd2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const StyledButton = styled(Button)({
  background: '#ff7043',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  '&:hover': {
    background: '#e64a19',
  },
});

const Support = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/support', formData);
      alert(response.data.message);
      setFormData({ email: '', subject: '', message: '' }); // Clear form after submission
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting request');
    }
  };

  return (
    <div>
      <Navbar/>
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 , marginTop:"13vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" sx={{ color: '#333' }}>
        Support Center
      </Typography>
      <SupportCard>
        <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Need Help? Reach Out to Us!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2, background: 'white', borderRadius: '5px' }}
          />
          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            sx={{ mb: 2, background: 'white', borderRadius: '5px' }}
          />
          <TextField
            fullWidth
            label="Describe your issue"
            variant="outlined"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 2, background: 'white', borderRadius: '5px' }}
          />
          <StyledButton type="submit" fullWidth>Submit</StyledButton>
        </form>
      </SupportCard>
      <Box textAlign="center" mt={4} p={3} sx={{ background: '#f8f9fa', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#555' }}>Other Ways to Contact Us:</Typography>
        <Typography variant="body1" sx={{ color: '#777' }}>📧 Email: support@journalapp.com</Typography>
        <Typography variant="body1" sx={{ color: '#777' }}>📞 Phone: +1 234 567 890</Typography>
        <Typography variant="body1" sx={{ color: '#777' }}>💬 Live Chat: Available 24/7</Typography>
      </Box>
    </Container>
    </div>
  );
};

export default Support;
