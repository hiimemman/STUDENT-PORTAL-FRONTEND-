import React, { Suspense } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box, Skeleton } from '@mui/material'

export function SwiperCarousel(props){
    


    return(<>
        <Carousel   >
            {
                props.slides.map( (item, i) => <Item key={i} item={item} height ={props.height}/> )
            }
        </Carousel>
    
    </>)

    function Item(props)
    {
    
        return (
            <>
               <Suspense fallback = {
   <Skeleton variant="rectangular" width="100%">
   <div style={{ paddingTop: '57%' }} />
 </Skeleton> } >
                
            <Paper 
            sx={{
                position: 'relative',
                backgroundColor: '#fff',
                color: '#fff',
                mb: 4,
                ml:-1,
                mt:-1,
                mr:-1,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(`+props.item.image+`)`,
                width:'100vw',
                height: props.height,
                borderRadius:'10px',
              }}
              variant="outlined">
               {console.log(props.item.image)}
            </Paper>
         
            </Suspense>
            </>
        )
    }
}