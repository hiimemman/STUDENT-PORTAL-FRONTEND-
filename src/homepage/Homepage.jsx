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
import { useNavigate } from 'react-router-dom';
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
export function Homepage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
//page current state
const currentPage = useSelector(state => (state.selectedPage.value));

  const [announcement, setAnnouncement] = useState([{id:'1'}]);

  //dispatch from redux
const dispatch = useDispatch();

//check current theme
const selectedTheme = useSelector(state =>(state.selectedTheme.value));


// const container = window !== undefined ? () => window().document.body : undefined;
const changeTheme = () =>{
  if(selectedTheme === 'darkTheme'){
    dispatch(LIGHT());
  }else{
    dispatch(DARK())
  }
}

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
              <Button sx={{ color: '#fff' }} onClick = {() => {navigate('/professor-portal')}}>
                Professor Portal
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
      <Box component="main" style ={{padding:'0px', m:0}} >
    
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

<Grid  style ={{width:'100%', height:'auto', marginBottom:'3.5rem'}} >
    <SwiperCarousel height ={'40vw'} slides ={banner} /> 
  </Grid>  

  <Fade bottom duration={1500}  >
  <Typography variant ={'h3'} className ="font-semibold" marginTop ="8rem">Mission</Typography>
    <Typography variant ={'h4'} marginTop ="1.5rem" marginBottom={"5rem"} marginLeft =  {'3rem'} marginRight =  {'3rem'} className ="font-semibold"><center>The <i className ="text-blue-900">ASIAN INSTITUTE OF SCIENCE AND TECHNOLOGY</i> commits itself in pursuit of leadership and excellence in the fields of science and technology, to contribute to the sustainable development and improvement of Philippine society.</center></Typography>
  </Fade>

  <Fade bottom duration={1500}  >
  <Typography variant ={'h3'} className ="font-semibold" marginTop ="8rem">Vision</Typography>
    <Typography variant ={'h4'} marginTop ="1.5rem" marginBottom={"5rem"} marginLeft =  {'3rem'} marginRight =  {'3rem'} className ="font-semibold"><center>The <i className ="text-blue-900">ASIAN INSTITUTE OF SCIENCE AND TECHNOLOGY </i> envisions itself as a globally competitive center of leadership and excellence in various program leader institution of higher learning in science and technology education</center></Typography>
  </Fade>

<Fade bottom duration={1500}  >
    <Typography variant ={'h3'} className ="font-semibold" marginTop ="3rem">Facilities</Typography>
    <Typography variant ={'body'} marginTop ="1.5rem" marginBottom={"5rem"}>a place, amenity, or piece of equipment provided for a particular purpose:</Typography>
    
 </Fade>
  <Grid  style ={{width:'100%',maxWidth:'1200px', height: '30vw', margin:'3.5rem'}}>
    <SwiperCarousel   height = {'30vw'} slides ={slides}/> 
  </Grid>  
    
    
    <Fade bottom duration={1500}>
    <Typography variant ={'h3'} className ="font-semibold" marginTop ="3rem">News and Updates</Typography>
    <Typography variant ={'body'} marginTop ="1.5rem" marginBottom={"5rem"}>information not previously known to someone:</Typography>
    </Fade> 
    
   
    <Masonry columns={{xs: 1, sm: 3, md:4}} spacing={3} style={{ marginTop:'3.5rem'}}>
      {announcement.map((announce) =>
       <CardFeatured date ={announce.added_at}image = {announce.image_url} title ={announce.title} message ={announce.message} id = {announce.id}/>
      )}
 </Masonry>    
 <Fade bottom duration={1500}>
    <Typography variant ={'h3'} className ="font-semibold" marginTop ="3rem" >Location</Typography>
    <Typography variant ={'body'} marginTop ="1.5rem" marginBottom={"5rem"} >an actual place or natural setting in which a film or broadcast is made, as distinct from a simulation in a studio</Typography>
   <Box  style={{ marginTop:'3.5rem'}}>
   <ClientLocation />
   </Box>
    
    </Fade> 
   


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
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669798566/317045452_860784958400250_2201995659751592710_n_a4hefv.jpg"
},

{
  id: 4,
  name:'Ken',
  description:'LmAO',
  image:"https://res.cloudinary.com/dm1ztuuvo/image/upload/v1669554715/banner-4_uepmv2.jpg"
},
];