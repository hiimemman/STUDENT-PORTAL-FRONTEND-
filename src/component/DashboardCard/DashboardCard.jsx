import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, useSprings, animated, interpolate } from 'react-spring'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './DashboardCard.css'

function Stack({ image, background, open,title }) {
    
    const { f, r } = useSpring({ f: open ? 0 : 1, r: open ? -3 : 3 })
    const cards = useSprings(5, [0, 1, 2, 3, 4].map(i => ({ opacity: 0.2 + i / 5, z: open ? (i / 5) * 80 : 0 })))
    return (
      <div class="container" >
         <p style ={{zIndex:1,}}className= "font-bold text- text-slate-100  hover:text-sky-400 absolute top-0 left-2" >
          {title}
        </p>
        {cards.map(({ z, opacity }, index) => (
          <animated.div
            style={{
              zIndex:0,
              opacity,
              background,
              transform: interpolate(
                [z, f.interpolate([0, 0.2, 0.6, 1], [0, index, index, 0]), r],
                (z, f, r) => `translate3d(0,0,${z}px) rotateX(${f * r}deg)`
              )
            }}>
            {index === 4 && <animated.img style={{ transform: f.interpolate([0, 1], ['scale(0.7)', 'scale(1)']) }} src={image} />}
          </animated.div>
        ))}
      </div>
    )
  }
export function DashboardCard(props){
  const [open, setOpen] = useState(false)
    return(
        <>
    <Card sx={{ maxWidth: 345, width: 270 }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <CardActionArea>
      <Stack image= {props.image} background="#52649e" open ={open} title ={props.title} />
      <CardContent style ={{height:'70px', marginTop: '-30px'}} >
          
          <Typography variant="body2" color="text.secondary">
           {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </>
    )
}