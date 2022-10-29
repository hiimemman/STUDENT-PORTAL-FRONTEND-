
import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export function MainFeaturedPost(p) {


  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        ml:-1,
        mt:-1,
        mr:-1,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://source.unsplash.com/random)`,
        borderRadius: '0',
        width:'100vw',
        height:'100%',
      }}

    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={'https://source.unsplash.com/random'} alt={'Image failed to load'} />}
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
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Asian Institute of Science and Technology
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            Asian Institute of  Science and Technology first come to existence as the Asian Institute of Electronics (AIE)
            </Typography>
            <Button size="medium" variant ="outlined">Learn More</Button>
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
  );
}


