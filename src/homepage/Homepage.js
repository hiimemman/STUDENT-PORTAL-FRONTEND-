import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ParticlesBackground } from '../component/ParticlesBackground';

export function  Homepage(){

    //Navigation
const navigate = useNavigate();
    return(
        <>
        <Button variant="text" onClick ={() => navigate('/loginemployee')}>Text</Button>
        </>
    )
}