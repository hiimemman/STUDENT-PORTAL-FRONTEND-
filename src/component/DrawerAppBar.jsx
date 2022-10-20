import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {CLOSE, OPEN} from  '../slice/MenuSlice/MenuState'
import { PageList } from './PageList';
import Grid from '@mui/material/Grid';
import { ProfileBox } from './ProfileBox';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSelector, useDispatch } from 'react-redux';
import { DARK, LIGHT } from '../slice/ThemeMode/ThemeMode';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/material';


const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export function DrawerAppBar() {

  const theme = useTheme();

 //dispatch from redux
 const dispatch = useDispatch();
    //check menu state
    const isOpen = useSelector(state => (state.isOpen.value))

    //check current theme
    const selectedTheme = useSelector(state =>(state.selectedTheme.value))

    //page current state
const currentPage = useSelector(state => (state.selectedPage.value));
 
  const handleDrawerOpen = () => {
    dispatch(OPEN())
  };

  const handleDrawerClose = () => {
    dispatch(CLOSE())
  };
  
  // const container = window !== undefined ? () => window().document.body : undefined;
const changeTheme = () =>{
  if(selectedTheme === 'darkTheme'){
    dispatch(LIGHT());
  }else{
    dispatch(DARK())
  }
}

  return (
    <>
 <AppBar position="fixed" open={isOpen}>   
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6"  className ='font-nunito'sx={{ flexGrow: 1 }}component="div">
          {/* LOGO HERE */}
        </Typography>
          <Grid container justifyContent="center" display ='flex'>
          <Typography variant = "h5" className ='font-nunito'>
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </Typography>
          </Grid>

        {/* profile */}
        <Stack direction="row" spacing={1}>
          <div className='mx-6'> 
             <IconButton sx={{ ml: 1 }}  color="inherit" onClick={changeTheme}>
              {selectedTheme !== 'darkTheme' ? (<Brightness4Icon />) : (<Brightness7Icon />)}
             </IconButton>
          </div> 
       <ProfileBox  onMouseEnter={handleDrawerOpen}/>
       </Stack>  

      </Toolbar>
    </AppBar>
  <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* List link */}
     <PageList />
    </Drawer>
    <DrawerHeader />
   
    </>
  );
  
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};


