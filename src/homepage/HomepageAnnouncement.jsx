import { useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { imageBaseUrl } from '../base-url/based-url';
import { Suspense } from 'react';
import { FormControl, Skeleton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { MainFeaturedPost } from './homepage-components/MainFeaturedPost';
import { useSelector, useDispatch } from 'react-redux';
import { DARK, LIGHT } from '../slice/ThemeMode/ThemeMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Fade from 'react-reveal/Fade';
import CardFeatured from './homepage-components/CardFeatured';
import { Paper, Grid, CssBaseline } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useEffect } from 'react';
import { HOMEPAGE } from '../slice/PageSlice/PageSlice';
import { basedUrl } from '../base-url/based-url';
import { ClientLocation } from '../component/ClientLocation';
import { SwiperCarousel } from './homepage-components/SwiperCarousel';

const drawerWidth = 240;
export function HomepageAnnouncement(props) {
    const {id} = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
//page current state
const currentPage = useSelector(state => (state.selectedPage.value));

  const [announcement, setAnnouncement] = useState([{id:'1'}]);

  //dispatch from redux
const dispatch = useDispatch();

//check current theme
const selectedTheme = useSelector(state =>(state.selectedTheme.value));

const [announcementContent, setAnnouncementContent]  = useState({});


// const container = window !== undefined ? () => window().document.body : undefined;
const changeTheme = () =>{
  if(selectedTheme === 'darkTheme'){
    dispatch(LIGHT());
  }else{
    dispatch(DARK())
  }
}

const getAnnouncement = async () =>{

    try{ 
        const data = new FormData();
       
        data.append('ID', id);
        //online api
        
        const sendRequest = await fetch(basedUrl+"/get-announcement-per-id.php",{
            method: "POST",
            body: data,
        });

        const getResponse = await sendRequest.json();
    
        if(getResponse.statusCode === 201){
        
        }else{
          //if succesfully retrieve data
          setAnnouncementContent(announcementContent => announcementContent = getResponse.content)
        }
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() =>{
    getAnnouncement();
    return () =>{

    }
  },[])

  useEffect(() =>{
    console.log(announcementContent)
return () =>{}
  },[announcementContent])

useEffect(() =>{
  dispatch(HOMEPAGE());
return() =>{}
},[])
  
// Get all student api
const getAllData = async () =>{

  try{ 
  
    //online api
      const sendRequest = await fetch(basedUrl+"/all-announcement-active.php");
      const getResponse = await sendRequest.json();
  
      if(getResponse.statusCode === 201){
      
      }else{
        //if succesfully retrieve data
        setAnnouncement((announcement => announcement = getResponse))
      }
  }catch(e){
    console.error(e)
  }
}
  useEffect(() =>{
    getAllData();
    return () => {}
  },[currentPage])



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Navigation
const navigate = useNavigate();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Box  sx={{ my: 1 }}>
          <img src= {imageBaseUrl+"homepage-logo.svg"} alt="SVG as an image" style ={{maxWidth:"100px"}}  />
        </Box>
      <Divider />
      <List>
      
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick = {() => {navigate('/Loginemployee')}}>
              <ListItemText primary= {'Employee Portal'} />
            </ListItemButton>
            <ListItemButton sx={{ textAlign: 'center' }} onClick = {() => {navigate('/student-portal')}}>
              <ListItemText primary= {'Student Portal'} />
            </ListItemButton>
            <IconButton sx={{ ml: 1 }}  color="inherit" onClick={changeTheme}>
              {selectedTheme !== 'darkTheme' ? (<Brightness4Icon />) : (<Brightness7Icon />)}
             </IconButton>
          </ListItem>
   
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: selectedTheme === 'lightTheme' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: selectedTheme === 'lightTheme' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: selectedTheme === 'lightTheme' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));



  return (
    <>
    <Suspense fallback = {
      <Skeleton variant="rectangular" width={210}
      height={118}></Skeleton>
    } >
         <Box sx={{ display: 'flex' }}  >
         <CssBaseline />
      <AppBar component="nav" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <img src= {imageBaseUrl+"homepage-logo.svg"} alt="SVG as an image" style ={{maxWidth:"100px"}}  />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
     
              <Button sx={{ color: '#fff' }} onClick = {() => {navigate('/Loginemployee')}}>
                Employee Portal
              </Button>
              <Button sx={{ color: '#fff' }} onClick = {() => {navigate('/student-portal')}}>
                Student Portal
              </Button>
              <IconButton sx={{ ml: 1 }}  color="inherit" onClick={changeTheme}>
              {selectedTheme === 'lightTheme' ? (<Brightness4Icon />) : (<Brightness7Icon />)}
             </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" style ={{padding:'0px'}} >
    
        <Toolbar />
       {/** Main content goes here */}

         
   <Grid  container
  spacing={0}
  marginTop = '0px'
  direction="column"
  alignItems="center"
  justifyContent="center"  
  paddingBottom = "1.5rem"
  marginBottom={'1.5rem'}>



          

<Paper elevation={1} sx ={{width:'90vw', m:'3.5rem'}} className ="rounded-lg">
    {announcementContent.length > 0 ? (<>
    
<Grid  style ={{ marginBottom:'3.5rem'}}>

<img src = {announcementContent[0].image_url} className ="rounded-t-lg" height ={'400px'} width ={'100%'}alt ="failed to load image"/>
<center>


<Typography variant='h3'>{announcementContent[0].title}</Typography>
<Typography variant='h4'>{announcementContent[0].message}</Typography>
</center>
</Grid>
    
    </>) : null}
</Paper>
    </Grid>
         
      </Box>
    </Box>
    </Suspense>
    </>
  );
}

const banner =[{
  id: 1,
  name:'Emman',
  description:'Randomator',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669554412/banner-1_gkl6m9.jpg"
},
{
  id: 2,
  name:'Dave',
  description:'Randomators',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669554562/banner-2_wkng5d.jpg"
},
{
  id: 3,
  name:'Ken',
  description:'LmAO',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669554604/banner-3_kbu55z.jpg"
},
];

const slides =[{
  id: 1,
  name:'Emman',
  description:'Randomator',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669105868/sample.jpg"
},
{
  id: 2,
  name:'Dave',
  description:'Randomators',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669105868/sample.jpg"
},
{
  id: 3,
  name:'Ken',
  description:'LmAO',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669384838/ewvxfqyluxjdiorsv1db.jpg"
},
{
  id: 4,
  name:'Ken',
  description:'LmAO',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669554715/banner-4_uepmv2.jpg"
},
];