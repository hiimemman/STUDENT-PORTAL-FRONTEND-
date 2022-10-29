import { useState } from 'react';
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
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainFeaturedPost from './homepage-components/MainFeaturedPost';



const drawerWidth = 240;
export function Homepage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

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
          </ListItem>
   
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

  return (
    <>
    <Suspense fallback = {
      <Skeleton variant="rectangular" width={210}
      height={118}></Skeleton>
    } >
         <Box sx={{ display: 'flex' }}>
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
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
     
              <Button sx={{ color: '#fff' }} onClick = {() => {navigate('/Loginemployee')}}>
                Employee Portal
              </Button>
   
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
      <Box component="main" >
        <Toolbar />
       {/** Main content goes here */}
          <MainFeaturedPost post ={mainFeaturedPost} fullWidth />
      </Box>
    </Box>
    </Suspense>
    </>
  );
}
