import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {removeUserInfo} from '../actions'
import { useNavigate } from 'react-router-dom';

export function ProfileBox(){
//UseNavigate
const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
             dispatch(removeUserInfo());
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
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}s
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
          {/* {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))} */}
        <MenuItem>Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick ={logOut}>Logout</MenuItem>
        </Menu>
      </Box>
    )
}