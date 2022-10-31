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
    <Card sx={{ width: 230,maxWidth: 290 }}>
      <CardActionArea>
    <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}>
    <div className ='h-full w-1.5  bg-cyan-800  absolute  left-0' ></div>
    <Box>
      <CardContent >
        <Typography gutterBottom variant="h6" component="div" color ="text.secondary">
          {props.title}
        </Typography>
        <Stack direction = "row" spacing ={2} style = {{paddingTop: '.5rem'}} >
          {props.icon}
        <Typography variant="h4" color="text.primary">
         {props.content}
        </Typography>
        </Stack>
      </CardContent>
   </Box>
    </Stack>
    </CardActionArea>
    </Card>
        </>
    )
}