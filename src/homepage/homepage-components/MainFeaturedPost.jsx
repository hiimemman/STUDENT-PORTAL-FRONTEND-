
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { imageBaseUrl } from '../../base-url/based-url'; 
import { Stack } from '@mui/system';
import { Fade } from 'react-reveal';


export function MainFeaturedPost(p) {


  return (
    <>
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: '#fff',
        color: '#fff',
        mb: 4,
        ml:-1,
        mt:-1,
        mr:-1,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
       
        borderRadius: '0',
        width:'auto',
        height:'auto',
      }}

    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={imageBaseUrl+'/homepage-banner-background.jpg'} alt={'Image failed to load'} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />

      <Grid container >
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
            className = "mt-40"
          >
         
            <Fade bottom duration={800}>
      
            <Typography component="h1" variant="h3" color="black" gutterBottom>
              Asian Institute of Science and Technology
            </Typography>
            <Typography variant="h5" color="black" paragraph>
            Asian Institute of  Science and Technology first come to existence as the Asian Institute of Electronics (AIE)
            </Typography>
            
            <Button size="medium" variant ="contained">Learn More</Button>
            </Fade>
          </Box>
        </Grid>
        <Grid item md ={6}>
        <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
            className = "mt-40"
          >
  <img style={{ display: 'none' }}  alt={'Image failed to load'} />
        </Box>
        </Grid>
      </Grid>
    
     
   
    
    </Paper>
    </>
  );
}


