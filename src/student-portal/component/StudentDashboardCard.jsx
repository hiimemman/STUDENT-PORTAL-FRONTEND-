import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

export function StudentDashboardCard(props){
    return(
        <>
    {/* <Card sx={{ width: 225,maxWidth: 290 }}>
      <CardActionArea>
    <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 1 }}>
    <div className ='h-full w-1.5  bg-cyan-800  absolute  left-0' ></div>
    <Box>
      <CardContent >
        <Stack direction ="row" spacing = {1} divider={<Divider orientation="vertical" flexItem />}>
        <Typography gutterBottom variant="h6" component="div" color ="text.secondary">
          {props.title}
        </Typography>
        <Typography variant ="h6" className='text-slate-400'>Active</Typography>
        </Stack>
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
    </Card> */}
    
    <div class="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
      <div class="p-3 mr-4 dark:bg-gray-700 text-white rounded-full">
        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg> */}
        {props.icon}
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-white">{props.title}</p>
        <p class="text-2xl font-normal text-white">{props.content}</p>
      </div>
    </div>
        </>
    )
}