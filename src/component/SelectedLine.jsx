import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

export function SelectedLine(props){
const [selectedPanel, setSelectedPanel] = useState(props.selected);
const [selectTheme, setTheme] = useState('');
 //check current theme
 const selectedTheme = useSelector(state =>(state.selectedTheme.value))

useEffect(() =>{
    if(selectedTheme === 'lightTheme'){
        setTheme('#112444')
       }else{
      setTheme('#00b0ff')
       } 
return () =>{
}
},[selectedTheme])

useEffect(() =>{
return () =>{
    
}
}, [selectedPanel])
    return(
        <>
        {selectedPanel === true ?(<div className ='h-10 w-1.5  absolute rounded-r-lg left-0' style ={{backgroundColor: selectTheme }} ></div>) : (<></>)}
        </>
    )
}