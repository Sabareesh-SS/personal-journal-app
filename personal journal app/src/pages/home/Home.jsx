import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import Navbartest1 from '../../components/navbar/navbartest1'


const HeroSection = styled(Box)(({ theme }) => ({
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
  borderRadius: '10px',
  padding: '20px',
  [theme.breakpoints.down('md')]: {
    height: '50vh',
    padding: '10px',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '160px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '140px',
    padding: '15px',
  },
}));

const InterestingSection = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  padding: '40px',
  textAlign: 'center',
  background: '#fff5e1',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <><div>
      {/* <Navbartest1/> */}
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4 , marginTop:"14vh"}}>

        <HeroSection>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Welcome to Your Personal Journal
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '600px', opacity: 0.8, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Capture your thoughts, ideas, and emotions with ease. Keep your personal space secure and accessible anywhere.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 3, backgroundColor: '#ff7043' }}
            onClick={() => navigate('/myjournals')}
          >
            Start Journaling
          </Button>
        </HeroSection>

        <Grid container spacing={4} sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" fontWeight="bold">Secure & Private</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                Your journal entries are encrypted and kept private.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" fontWeight="bold">Easy to Use</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                Simple, intuitive design for a seamless experience.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" fontWeight="bold">Sync Anywhere</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                Access your journal from any device, anytime.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        <InterestingSection>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Stay Inspired & Motivated
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '700px', margin: '0 auto', opacity: 0.8 }}>
            Keep track of your emotions, set daily goals, and reflect on your progress. Journaling is a journey, and we are here to make it easier for you.
          </Typography>
        </InterestingSection>
      </Container>
      </div>
    </>
  );
};

export default HomePage;
