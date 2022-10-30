import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, CardActionArea } from '@mui/material';

export function DashboardCard(props){
    return(
        <>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
    <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}>
    <div className ='h-full w-1.5  bg-cyan-800  absolute  left-0' ></div>
    <Box>
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
   </Box>
    </Stack>
    </CardActionArea>
    </Card>
        </>
    )
}