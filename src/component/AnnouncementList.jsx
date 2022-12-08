import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from 'react';
import { basedUrl } from '../base-url/based-url';

import { useSelector,useDispatch } from 'react-redux';




export default function AnnouncementList() {

  //page current state
const currentPage = useSelector(state => (state.selectedPage.value));

  const [announcement, setAnnouncement] = useState([{id:'1'}]);
  const [updated, setUpdated] = useState(false);
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

  useEffect(() =>{
    setUpdated(updated => updated = true)
    return () => {}
  },[announcement])

  useEffect(() =>{

    return() =>{}
  },[updated])
  function renderRow(props) {
    const { index, style } = props;
  
    return (
      <List sx={{  bgcolor: 'background.paper', width: '90vw' }}  >
        {console.log(announcement)}
        {updated === true ? (announcement.map((announce) =>
        <>
         <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Failed to load" variant="rounded"  src= {announce.image_url} />
          </ListItemAvatar>
          <ListItemText
            primary= {announce.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                 {announce.editor} - 
                </Typography>
                {announce.message}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" width ="100vw" /> 
        </>
        )) : null}
 
      
       
    </List>
    );
  }

  

  return (
    <Box
  
      sx={{  height: 400, bgcolor: 'background.paper'}}
 
    >
      {console.log(announcement.length)}
      <FixedSizeList
        height={240}
        itemSize={46}
        itemCount={1}
        overscanCount={5}
        className ="w-fit"
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}