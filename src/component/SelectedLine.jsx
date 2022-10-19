import { useEffect, useState } from 'react';


export function SelectedLine(props){
const [selectedPanel, setSelectedPanel] = useState(props.selected);


useEffect(()=>{

return () =>{
    console.log("SELECTED?" + selectedPanel)
}
},[selectedPanel])

    return(
        <>
        {selectedPanel === true ?(<div className ='h-10 w-1.5 bg-sky-500 absolute rounded-r-lg left-0' ></div>) : (<></>)}
        </>
    )
}