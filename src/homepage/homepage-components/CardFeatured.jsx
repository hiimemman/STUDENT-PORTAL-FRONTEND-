import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid, Stack } from '@mui/material';
import { Fade } from 'react-reveal';
import { NightShelter } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function CardFeatured(props) {
    //UseNavigate
    const navigate = useNavigate();
  return (
    <>
    <Fade bottom duration={800}>
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea onClick ={ () => navigate("/announcement/"+props.id)}>
        <CardMedia
          component="img"
          height="140"
          image= {props.image}
          alt="green iguana"
        />
        <CardContent>
          <Stack direction ="row" spacing = {1}>
            <EventNoteIcon fontSize="medium" />
            <Typography>{moment(props.date).format("MMM Do YYYY")}</Typography>
          </Stack>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {console.log(props.message)}
            {props.message !== undefined ? props.message.length <= 18 ? props.message: (props.message.substr(0, 40) + "...") : null}
            
          </Typography>
          
          {props.added_at}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick ={ () => navigate("/announcement/"+props.id)}>
          Read more
        </Button> 
         
      </CardActions>
    </Card>
    </Fade>
    </>
   
  );
}
