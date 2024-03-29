import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_PROFESSOR } from '../../slice/ProfessorSession/professorSession';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { imageBaseUrl } from '../../base-url/based-url';

export function StudentProfileBox(){
//UseNavigate
const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);
  //Current session studentSession
  const studentSession = useSelector(state => JSON.parse(state.professor.session))
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
             sessionStorage.removeItem('studentSession')
              dispatch(REMOVE_PROFESSOR());
              navigate('/student-portal');
            }else{          
             console.error(getResponse.statusCode)
            }
        }catch(e){
          console.log(e)
        }
    }
 
    return(
      <>
      {studentSession.firstname !== null ? (<Box sx={{ flexGrow: 0}} >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={studentSession.firstname} src= {imageBaseUrl+studentSession.profile_url} />
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
      
      
        <MenuItem onClick ={logOut} className ='font-nunito'>Logout</MenuItem>
        </Menu>
      </Box>) : (<Skeleton variant="circular" width={40} height={40} />)}
 
      </>
    );
}