import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_USER } from '../slice/UserSession/userSession';
import { useNavigate } from 'react-router-dom';

export function ProfileBox(){
//UseNavigate
const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);
  //Current session user
  const user = useSelector(state => JSON.parse(state.user.session))
  //dispatch from redux
  const dispatch = useDispatch();


    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    const logOut = async() =>{
        try{
            const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/logout.php");
            
            const getResponse = await sendRequest.json();
            if(getResponse.statusCode === 200){
             console.log('Logout Succesfully')
             sessionStorage.removeItem('user')
              dispatch(REMOVE_USER())
             navigate('/LoginEmployee')
            }else{          
             console.error(getResponse.statusCode)
            }
        }catch(e){
          console.log(e)
        }
    }
 
    return(
        <Box sx={{ flexGrow: 0}} >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.firstname} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
      
        <MenuItem className ='font-nunito'>Profile</MenuItem>
        <MenuItem className ='font-nunito'>My account</MenuItem>
        <MenuItem onClick ={logOut} className ='font-nunito'>Logout</MenuItem>
        </Menu>
      </Box>
    )
}