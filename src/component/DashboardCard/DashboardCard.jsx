import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Box, CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import {useEffect, useState} from 'react';

export function DashboardCard(props){

const [courseGpa, setCourseGpa] = useState({});

const getCoursegpa =  async () =>{
  try{ 
 
    //online api
    const data = new FormData();
    data.append('Course', props.title);
    data.append('AcademicYear', props.acadyear);
    data.append('Semester', props.semester);
    for (var pair of data.entries()) {
      console.log(pair[0]+ ' - ' + pair[1]); 
    }
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/get-gpa-per-course.php",{
          method: "POST",
          body: data,
      });

      const getResponse = await sendRequest.json();
      console.log(getResponse)
      if(getResponse.statusCode === 200){
        setCourseGpa(courseGpa => courseGpa = getResponse.gpa);
      }else{
        //if succesfully retrieve data
     
     console.error("error")
      }
  }catch(e){
    console.error(e)
  }
 }

 useEffect(() =>{
  getCoursegpa();

  return () =>{}
 },[props])

useEffect(() =>{
  return () =>{}
},[courseGpa])
    return(
  <>
    <div class="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
      <div class="p-3 mr-4 dark:bg-gray-700 text-white rounded-full">
        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg> */}
        {props.icon}
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-white">{props.title}</p>
        {console.log(courseGpa)}
        {courseGpa > 1 ? ( <p class="text-2xl font-normal text-white">{courseGpa.toFixed(2)}</p>) : <p class="text-2xl font-normal text-white">Not available</p>}
       
      </div>
    </div>
        </>
    )
}